import mongoose,{Schema, Types} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commmentSchema=new Schema({
   content:{
    type:String,
    required:true,
   },
   video:{
    type:Schema.Types.ObjectId,
    ref:"Video",
   },
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
   },
 } ,
 {timestamps:true}
);
commmentSchema.plugin(mongooseAggregatePaginate)
export default mongoose.model("Comment", commmentSchema);