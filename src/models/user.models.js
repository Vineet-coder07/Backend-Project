// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     fullname: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"]
//     },
//     refreshToken: {
//       type: String
//     }
//   },
//   { timestamps: true }
// );

// // ✅ Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // ✅ Compare password
// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // ✅ Generate Access Token
// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this.id,
//       username: this.username,
//       fullname: this.fullname,
//       email: this.email,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };

// // ✅ Generate Refresh Token
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this.id,
//       username: this.username,
//       fullname: this.fullname,
//       email: this.email,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//   );
// };

// export const User = mongoose.model("User", userSchema);


import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      fullname: this.fullname,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      fullname: this.fullname,
      email: this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
