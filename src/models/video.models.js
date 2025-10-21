/*videos [icon: video, color: red]{
  videofile string
  title string
  description string
  url string
  thumbnail_url string
  uploadedAt date
  updatedAt date
  views int
  duration int
  owner_id string
}*/
import mongoose,{Schema} from "mongoose";
const videoSchema=new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true,
    },
    tittle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    views:{
        type:Number,
        default:0,
    },
    duration:{
        type:Number,
        required:true,
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Video=mongoose.model("Video",videoSchema)