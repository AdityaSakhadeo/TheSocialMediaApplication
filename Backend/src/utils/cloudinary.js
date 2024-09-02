import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const uploadResult = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type:'auto',
      }
    );
    //Code when the file is uploaded sucessfully
    console.log("File is uploded sucessfully!!");
    return uploadResult
  } catch (error) {
    fs.unlinkSync(localFilePath); //Remove the locally saved temporary file if upload got failed
  }
}

export {uploadOnCloudinary};