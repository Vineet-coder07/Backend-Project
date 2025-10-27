import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
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
   const avatarLocalPath=req.files?.avatar[0]?.path
   const coverLocalPath=req.files?.coverImage[0]?.path

})
export{registerUser};