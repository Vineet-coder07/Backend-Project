import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();
// config dotenv
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// upload an image
const UploadonCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;
    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder:"uploads",
            resource_type: "auto"
        });
        console.log(result);
        console.log("File uploaded on Cloudinary. File src: " + (result.secure_url || result.url));
        console.log('Public ID:', result.public_id);
        console.log('Secure URL:', result.secure_url);
        console.log('Full result:', result);
        // once the file is uploaded, delete it from our server
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return result;
    } catch (error) {
        // try to clean up local file if it exists
        if (fs.existsSync(localFilePath)) {
            try { fs.unlinkSync(localFilePath); } catch (_) {}
        }
        console.error('Cloudinary upload error:', error);
        return null;
    }
};
const deleteFromCloudinary=async(publicId)=>{
    try{
        const result =await cloudinary.uploader.destroy(publicId)
        console.log("Deleted  from cloudinary","publicId : ",publicId)
    } catch(error){
        console.log("Error in deleting from cloudinary",error)
        return null
    }
}

export { UploadonCloudinary ,deleteFromCloudinary};