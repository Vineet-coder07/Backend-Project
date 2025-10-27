import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {UploadonCloudinary} from "../utils/cloudinary.js";
const registerUser=asyncHandler(async(req,res)=>{
   const {fullname,email,username,password}=req.body
   //validation
   if(
    [fullname,username,email,password].some((field)=> field?.trim() === "")
){
    throw new ApiError(400,"All fields are required")
   }
   const existedUser= await User.findOne({
    $or:[{username},{email}]
   })
   if(existedUser){
    throw new ApiError(400,"User with email or username already exist")
   }
   console.warn(req.files)
   const avatarLocalPath=req.files?.avatar[0]?.path
   const coverLocalPath=req.files?.coverImage[0]?.path
   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is missing")
   }
//    const avatar=await UploadonCloudinary(avatarLocalPath);
//    let coverImage="";
//    if(coverLocalPath){
//     coverImage=await UploadonCloudinary(coverLocalPath);
//    }
    let avatar;
    try{
        avatar=await UploadonCloudinary(avatarLocalPath)
        console.log("avatar uploaded",avatar);
    } catch(error){
        console.log("Error uploading avatar",error);
        throw new ApiError(500,"Failed to upload avatar")
    }
    let coverImage;
    try{
        avatar=await UploadonCloudinary(coverLocalPath)
        console.log("coverimage uploaded",coverImage);
    } catch(error){
        console.log("error in uploading coverimage",error);
        throw new ApiError(500,"Failed to upload coverimage")
    }
   const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })
   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering a user");
   }
   return res
      .status(201)
      .json(new ApiResponse(201,createdUser,"User created successfully"));
});
export{registerUser};