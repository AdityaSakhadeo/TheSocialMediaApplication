import Destination from "../models/destinationModel.js";
import { User } from "../models/userModel.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @description : Control flow used for following the user
 * @route : /api/v1/actions/follow
 * @access : Private
 * @payload : {targetUserId:"DEMOUSERID"}
 */

export const followUser = asyncHandler(async (req, res) => {
  const { currentUserId,targetUserId } = req.body;

  const targetUser = await User.findById(targetUserId);
  const currentUser = await User.findById(currentUserId);
//   const currentUser = req.user;

  if (!targetUser) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  if (targetUserId.toString() === currentUserId.toString()) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "You cannot follow yourself!"));
  }

  if (targetUser.followers.includes(currentUserId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "You are already following the user"));
  }

  targetUser.followers.push(currentUserId);
  currentUser.followedPeople.push(targetUserId);

  await currentUser.save({ validateBeforeSave: false });
  await targetUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User followed successfully"));
});

/**
 * @description : Control flow used for following the destination
 * @route : /api/v1/actions/followDestination
 * @access : Private
 * @payload : {targetDestinationId:"DEMODESTINATIONID"}
 */

export const followDestination = asyncHandler(async ( req,res)=>{
  const {currentUserId , destinationName} = req.body;

    const currentUser = await User.findById(currentUserId);
    const destination = await Destination.findOne({name:destinationName.toLowerCase()});
    
    console.log("Destination:::::::",destination)
    if (!currentUser) {
      return res
      .status(400)
      .json(new ApiResponse(400,null,"User not found for the current user ID"))
    }

    if (!destination) {
      return res
      .status(400)
      .json(new ApiResponse(400,null,"Destination not found with this name"))
    }

    console.log("Destination ID::::",destination._id);
    if (currentUser.followedPages.includes(destination._id)) {
      return res
      .status(400)
      .json(new ApiResponse(400,null,"Destination already followed"))
    }

    destination.followers.push(currentUserId);
    currentUser.followedPages.push(destination._id);

    await destination.save({validateBeforeSave:false});
    await currentUser.save({validateBeforeSave:false});

    return res
    .status(200)
    .json(new ApiResponse(200,destination,"Destination followed successfully"))
})