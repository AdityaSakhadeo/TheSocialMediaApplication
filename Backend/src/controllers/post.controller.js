import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/APIResponse.js";

/**
 * @description : Function to upload the post
 * @route : /api/v1/posts/createPost
 * @access : Public
 */

export const createPost = asyncHandler(async (req, res) => {
  const { currentUser,safety, accessibility, cost, caption, destination } = req.body;


  // Validate required fields: check if any of them is undefined, null, or an empty string
  if ([currentUser, safety, accessibility, cost, caption].some(field => field === undefined || field === null || field === "")) {
    return res
      .status(400)
      .json(new ApiResponse(400, null,"please upload all necessary fields"))
      
  }

  //The function looks for the uploaded image file in req.files. It accesses the path of the first image, which is expected to be included in the request.
  const imagePath = req.files?.image[0]?.path; 

  // Check if the image path is not present
  if (!imagePath) {
    throw new ApiError(400, "Image source not received"); // Throw an error if no image is uploaded
  }

  // Upload the image to Cloudinary and get the URL
  const postImage = await uploadOnCloudinary(imagePath); // Upload to Cloudinary


  let starSum = safety+accessibility+cost;
  let starAvg = starSum/3;


  try {
    // Create a new post using the validated fields and uploaded image URL
    const post = await Post.create({
      owner: currentUser, //current user id will be the owner of the post
      safety, 
      accessibility, 
      cost, 
      image:postImage.url, 
      caption, 
      destination, 
      totalStars:starSum,
      averageStars: starAvg,
    });

    
    return res.status(201).json(new ApiResponse(200, post, "Post created successfully"));//return successful message if post is created
  } catch (error) {
    // Check for validation errors and extract messages
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message); // Map error messages
      return res.status(400).json(new ApiResponse(400, "", messages)); // Return error response
    }
    // Throw a generic server error if something else goes wrong
    throw new ApiError(500, "Server Error");
  }
});



