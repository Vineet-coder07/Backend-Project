/*
playlists [icon: list, color: blue]{
  id string pk
  name string
  description string
  createdAt date
  updatedAt date
  owner_id string
}*/
import mongoose,{Schema} from "mongoose";
const playlistSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:string,
    },
    createdAt :{
        type:Date,
    },
    updatedAt : {
        type:Date,
    },
    owner_id : {
        type:String,
    }
},{timestamps:true});
export const playlistmodel=mongoose.model("Playlist",playlistSchema);