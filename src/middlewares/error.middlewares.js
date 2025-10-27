import mongoose  from "mongoose";
import { ApiError } from "../utils/ApiError.js";
const errorHandler=(err,req,res,next)=>{
    let error=err
    let statusCode = 500
    if(!(error instanceof ApiError)){
        statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500)
    } else {
        statusCode = error.statusCode || 500
    }
    const message=error.message || "Something went wrong"
    error=new ApiError(statusCode,message,error?.errors || [],err?.stack)
    const response ={
        statusCode: error.statusCode,
        message: error.message,
        ...new ApiError(process.env.NODE_ENV === "development"? {stack:error.stack}:{})
    }
   return res.status(error.statusCode).json(response)
}
export{errorHandler};
