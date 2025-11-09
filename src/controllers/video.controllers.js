
import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.models.js";
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(!title || title.trim() === ""){
        throw new ApiError(400,"title is required");
    }
    if(!description || description.trim() === ""){
        throw new ApiError(400,"description is required");
    }
    const existedVideo=await Video.findOne({videoFile});
    if(existedVideo){
        throw new ApiError(400,"Video already exist in the database")
    }
    const videolocalpath=req.files?.videoFile?.[0]?.path;
    const thumbnaillocalpath=req.files?.videoFile?.[0]?.path;
    

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
