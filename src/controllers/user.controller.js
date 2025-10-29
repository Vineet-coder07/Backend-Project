// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../models/user.models.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const registeruser = asyncHandler(async (req, res) => {
//   console.log("REQ BODY:", req.body);

//   const { username, email, fullname, password } = req.body;

//   if ([username, email, fullname, password].some((field) => !field)) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await User.findOne({ $or: [{ username }, { email }] });
//   if (existedUser) {
//     throw new ApiError(409, "User with email or username already exists");
//   }

//   const user = await User.create({
//     username,
//     email,
//     fullname,
//     password
//   });

//   const createdUser = await User.findById(user._id).select("-password");
//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering user");
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(200, createdUser, "User registered successfully"));
// });

// export { registeruser };


import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";

const registeruser = asyncHandler(async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ FILES:", req.files);

  const { username, email, fullname, password } = req.body;

  // required fields validation
  if ([username, email, fullname, password].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  // check existing user
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Build avatar & coverImage URLs (if provided)
  // Since files are stored in public/uploads/..., and app serves static 'public',
  // the public URL path is: /uploads/avatars/<filename>
  const host = `${req.protocol}://${req.get("host")}`;

  const avatarFile = req.files?.avatar?.[0];
  const coverFile = req.files?.coverImage?.[0];

  const avatarUrl = avatarFile ? `${host}/uploads/avatars/${avatarFile.filename}` : "";
  const coverImageUrl = coverFile ? `${host}/uploads/coverImages/${coverFile.filename}` : "";

  // Create user
  const user = await User.create({
    username,
    email,
    fullname,
    password,
    avatar: avatarUrl,
    coverImage: coverImageUrl
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
