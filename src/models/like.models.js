import mongoose,{Schema} from "mongoose";
const likeschema=new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"video",
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:"Tweet",
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
},
{
    timestamps:true,
});
export const like=mongoose.model("Like",likeschema);