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
            resource_type: "auto"
        });
        console.log("File uploaded on Cloudinary. File src: " + (result.secure_url || result.url));
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

export { UploadonCloudinary };