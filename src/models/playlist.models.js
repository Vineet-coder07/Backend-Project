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
    videos:[{
        type:Schema.Types.ObjectId,
        ref:"Video",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

},{timestamps:true});
export const playlistmodel=mongoose.model("Playlist",playlistSchema);