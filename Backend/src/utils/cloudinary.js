import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config({ path: '../../env' });
//As the code cloudinary.config is executing before the environement variables are loaded
// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   cloud_name: "dpguqgizx",
//   api_key: "776935689862721",
//   api_secret: "pX_6tOkmvjeTNflREDa-_QkNGDw",
// });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const uploadResult = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: 'auto',
      }
    );
    console.log("File uploaded successfully!");
    
    // Remove the temporary file after upload
    fs.unlinkSync(localFilePath);

    return uploadResult;
  } catch (error) {
    // If upload fails, remove the local file
    fs.unlinkSync(localFilePath);
    console.log(error)
    throw new Error("Failed to upload image"); // Handle error as needed
  }
}
export {uploadOnCloudinary};