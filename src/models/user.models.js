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
export const User=mongoose.model("User",userSchema);