/*
comments [icon: message-circle, color: green]{
  id string pk
  video_id string
  user_id string
  parent_comment_id string
  content string
  created_at timestamp
  updated_at timestamp
}*/
import mongoose,{Schema} from "mongoose";
const comments=new Schema({
    video_id:{
        type:String,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    },
    parent_comment_id :{
        type:String,
        required:true,
    },
    content:{
        type:String,

    },
    
})