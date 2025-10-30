import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UploadonCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const registeruser = asyncHandler(async (req, res) => {
  console.log("----DEBUG----");
  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.files);
  console.log("--------------");

  const { username, email, fullname, password } = req.body;

  // validation
  if ([username, email, fullname, password].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user exists
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // get file paths from multer
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // upload to Cloudinary
  console.log("Uploading to Cloudinary...");
  const avatarUpload = await UploadonCloudinary(avatarLocalPath, "uploads/avatars");
  const coverUpload = coverLocalPath
    ? await UploadonCloudinary(coverLocalPath, "uploads/coverImages")
    : null;

  if (!avatarUpload?.secure_url) {
    throw new ApiError(500, "Avatar upload failed on Cloudinary");
  }

  console.log("✅ Uploaded to Cloudinary:", avatarUpload.secure_url);

  // create user
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
});

export { registeruser };
