/*
users [icon: user, color: yellow]{
  id string pk
  username string
  email string
  fullname string
  avatar string
  coverImage string
  watchHistory ObjectId[] videos
  password string
  refreshToken string
  createdAt date
  updatedAt date
}*/
import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema =new Schema(
    {
      user_id:{
         type:String,
         unique:true,
         required:true,
      },
         username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
         },
         email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
         },
         fullname :{
            type:String,
            required:true,
            trim:true,
            index:true
         },
         avatar:{
            type:String,
            required:true,
         },
         coverImage:{
            type:String,
         },
         watchHistory:[{
            type: Schema.Types.ObjectId,
            ref:"Video"
         }],
         password : {
            type:String,
            required:[true,"password is required"]
         },
         refreshToken:{
            type:String
         }
    },
    {
       timestamps:true
    }
) 

userSchema.pre("save", async function(next){
   if(!this.modified("password")) return next()
   this.password=bcrypt.hash(this.password,10)
   next()
})
userSchema.methods.isPasswordCorrect=async function(password) {
  return await bcrypt.compare(password,this.password)
}

// access tokens
userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
      _id:this.id,
      username:this.username,
      fullname:this.fullname,
      email:this.email,
   },process.env.ACCESS_TOKEN_SCERET,
{expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
);
}
// refresh tokens
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
      _id:this.id,
      username:this.username,
      fullname:this.fullname,
      email:this.email,
   },process.env.REFRESH_TOKEN_SCERET,
{expiresIn: process.env.REFRESH_TOKEN__EXPIRY}
);
}



export const User=mongoose.model("User",userSchema);