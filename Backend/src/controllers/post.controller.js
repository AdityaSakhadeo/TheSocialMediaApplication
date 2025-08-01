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
 * @access : Private
 */

export const createPost = asyncHandler(async (req, res) => {
  const { currentUserId, safety, accessibility, cost, caption, destination, point } = req.body;

  // Validate required fields: check if any of them is undefined, null, or an empty string
  if ([currentUserId, safety, accessibility, cost, caption, destination, point].some(field => field === undefined || field === null || field === "")) {
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



  const currentDestination = await Destination.findOne({ name: destination.toLowerCase() });
  console.log("currentDestination:::::::::::::::::::::::::::::", currentDestination._id)

  if (!currentDestination) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "current destination is not retriving"))
  }

  // const selectedPoint = currentDestination.points.find(p => p.name.toLowerCase() === point.toLowerCase())
  const selectedPoint = currentDestination.points.find(p => p.name.toLowerCase() === point.toLowerCase());
  if (!selectedPoint) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Point name does not match for the given destination"));
  }

  let starSum = parseInt(safety) + parseInt(accessibility) + parseInt(cost);
  let starAvg = starSum / 3;


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


  const body = {
    owner: currentUserId,
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
      owner: currentUser._id,
      safety,
      accessibility,
      cost,
      image: imageUrls,
      caption,
      destination: currentDestination._id,
      totalStars: starSum,
      averageStars: starAvg,
    });

    selectedPoint.posts.push(post._id);
    await currentDestination.save({ validateBeforeSave: false });

    return res.status(201).json(new ApiResponse(200, post, "Post created successfully"));
  } catch (error) {
    // Check for validation errors and extract messages
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json(new ApiResponse(400, "", messages));
    }
    // Throw a generic server error if something else goes wrong
    throw new ApiError(500, "Server Error");
  }
});


/**
 * @description : Return posts for the particular user
 * @route : /api/v1/posts/feed/:userId
 * @access : Private
 */

export const showFeed = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(200, null, "user not found"))
  }

  const followedUsers = user.followedPeople || [];
  const followedDestinations = user.followedPages ? user.followedPages : [];

  const userPosts = await Post.find({
    owner: { $in: [...followedUsers, user._id] },
    isPublished: true,
  })
    .populate("owner", "username profileImage")
    .populate({
      path: 'destination',
      select: 'name destinationImages points',
      populate: {
        path: 'points',
        select: 'name'
      },
    }).populate("destination")
    .sort({ createdAt: -1 });

  // Get posts made under followed destinations
  const destinationPosts = await Post.find({
    destination: { $in: followedDestinations },
    isPublished: true,
  })
    .populate("owner", "username profileImage")
    .populate({
      path: 'destination',
      select: 'name destinationImages points',
      populate: {
        path: 'points',
        select: 'name'
      },
    })
    .sort({ createdAt: -1 });


  // const feed = await Post.find({
  //   $or:[
  //     {owner: {$in:[...followedUsers,user._id]}},
  //     {destination : {$in:followedDestinations}}
  //   ]
  // }).populate("owner",'username profileImage')
  //   .populate({
  //     path:'destination',
  //     select:'name destinationImages points',
  //     populate:{
  //       path:'points',
  //       select:'name'
  //     },
  //   })
  //   .sort({createdAt:-1})

  // console.log("feed::::::",JSON.stringify(feed))

  const feed = {
    userPosts: userPosts,
    destinationPosts: destinationPosts
  }


  return res
    .status(200)
    .json(new ApiResponse(200, feed, "feed data fetched successfully"));
})
