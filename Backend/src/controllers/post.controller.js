import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/APIResponse.js";
import Destination from "../models/destinationModel.js";
import Post from "../models/postModel.js";
import { User } from "../models/userModel.js";

/**
 * @description : Function to upload the post
 * @route : /api/v1/posts/createPost
 * @access : Public
 */

export const createPost = asyncHandler(async (req, res) => {
  const { currentUserId, safety, accessibility, cost, caption, destination } = req.body;

  // Validate required fields: check if any of them is undefined, null, or an empty string
  if ([currentUserId, safety, accessibility, cost, caption].some(field => field === undefined || field === null || field === "")) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "please upload all necessary fields"))

  }

  const currentUser = await User.findById(currentUserId).select('_id');
  if (!currentUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User not found"));
  }

  //The function looks for the uploaded image file in req.files. It accesses the path of the first image, which is expected to be included in the request.
  const imageFiles = req.files?.images;

  if (!imageFiles || imageFiles.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Images not received"))
  }

  const uploadedImages = await Promise.all(
    imageFiles.map(file => uploadOnCloudinary(file.path))
  );

  const imageUrls = uploadedImages.map(img => img.url);

  const currentDestination = await Destination.findOne({ name: destination }).select('_id');
  console.log("currentDestination:::::::::::::::::::::::::::::", currentDestination._id)
  if (!currentDestination) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "current destination is not retriving"))

  }

  let starSum = parseInt(safety) + parseInt(accessibility) + parseInt(cost);
  let starAvg = starSum / 3;

  const body = {
    owner: currentUserId, //current user id will be the owner of the post
    safety,
    accessibility,
    cost,
    image: imageUrls,
    caption,
    destination: currentDestination._id,
    totalStars: starSum,
    averageStars: starAvg,
  }


  console.log("BODY::::", body)
  try {
    // Create a new post using the validated fields and uploaded image URL
    const post = await Post.create({
      owner: currentUser._id, //current user id will be the owner of the post
      safety,
      accessibility,
      cost,
      image: imageUrls,
      caption,
      destination: currentDestination._id,
      totalStars: starSum,
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



