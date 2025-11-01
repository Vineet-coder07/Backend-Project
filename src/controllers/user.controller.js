import {ApiError} from "../utils/ApiError.js";
import{ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { UploadonCloudinary ,deleteFromCloudinary} from "../utils/cloudinary.js";
import {User} from "../models/user.models.js";
import { validate } from "uuid";

const generateAccessTokenAndRefreshToken=async(userId)=>{
  try {
    const user=await User.findById(userId)
    if(!user){
      throw  new ApiError(500,"User with this userid does't exit")
    }
    const Accesstoken=user.generateAccessToken
    const Refreshtoken=user.generateRefreshToken
    user.Refreshtoken=Refreshtoken
    await user.save({validateBeforeSaave:false})
    return {Accesstoken,Refreshtoken};
  } catch (error) {
    throw new ApiError(500,"Something went wrong with access and refresh tokens")
  }



}
const registeruser = asyncHandler(async (req, res) => {
  console.log("----DEBUG----");
  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.files);
  console.log("--------------");

  const { username, email, fullname, password } = req.body;

  if ([username, email, fullname, password].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

   const avatarLocalPath = req.files?.avatar?.[0]?.path;
   const coverLocalPath = req.files?.coverImage?.[0]?.path;

   if (!avatarLocalPath) {
     throw new ApiError(400, "Avatar file is required");
   }

   console.log("Uploading to Cloudinary...");
   const avatarUpload = await UploadonCloudinary(avatarLocalPath, "uploads/avatars");
   const coverUpload = coverLocalPath
     ? await UploadonCloudinary(coverLocalPath, "uploads/coverImages")
     : null;

   if (!avatarUpload?.secure_url) {
     throw new ApiError(500, "Avatar upload failed on Cloudinary");
   }

   console.log("✅ Uploaded to Cloudinary:", avatarUpload.secure_url);

  try {
    const user = await User.create({
      username,
      email,
      fullname,
      password,
       avatar: avatarUpload.secure_url,
       coverImage: coverUpload?.secure_url || "",
    });
  
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering user");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    throw new ApiError(500,"Something went wrong while registering a user");
  }
  if(avatarUpload){
    await deleteFromCloudinary(avatarUpload.public_id)
  }
  if(coverUpload){
    await deleteFromCloudinary(coverImage.public_id)
  }
});

const loginUser=asyncHandler(async (req,res)=>{
  // get data from body
  const {email,username,password}=req.body
  //validation
  if(!email){
    throw new ApiError(400,"email is required")
  }
  const user=await User.findOne({
    $or:[{username},{email}]
  })
  if(!user){
    throw new ApiError(404,"User not found")
  }
  //validate passsword
  const isPasswordCorrect=await user.isPasswordCorrect(password)
  if(!isPasswordCorrect){
    throw new ApiError(401,"Invalid creditials")
  }
   const {Accesstoken,Refreshtoken}=await generateAccessTokenAndRefreshToken(user._id)
   const loggedUser=await User.findById(user._id).select("-password -refreshToken")
   const options={
    httponly:true,
    secure:process.env.NODE_ENV === "production",
   }
   return res
     .status(200)
     .cookie("accessToken",Accesstoken ,options)
     .json(new ApiResponse(200,
      {user:loggedUser,Accesstoken,Refreshtoken},
      "User logged Successfully"
     ))


})
export{registeruser,loginUser};