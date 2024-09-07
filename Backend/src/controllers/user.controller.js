import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { User } from "../models/userModel.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/APIResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, fullName, password } = req.body;

  //Checking if all the fields are received or not
  if (
    [username, email, phoneNumber, fullName, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  //Add more validations here if necessary

  //Now check if the user is already there or not by checking if username or email is already there
  const existedUser= await User.findOne({
    $or: [{ username }, { email }],  //to be changed when once used
  });

  if (existedUser) {
    throw new ApiError(409,"The user with this username or emial already exists")
  }

  //Dealing the with the image uploading
  // const profilePhotoPath = req.files?.profilePhoto[0]?.path;

  // if(!profilePhotoPath){
  //   throw new ApiError(400, "Please upload a profile photo");
  // }

  // const profilePhoto = await uploadOnCloudinary(profilePhotoPath);
  //This will return the URL of the profile photo


  const user = await User.create({
    username:username.toLowerCase(),
    password,
    fullName,
    phoneNumber,
    profilePhoto: ""
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refereshToken"
  );

  if (!createdUser) {
    throw new ApiError(500,"Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User created registered successfully")
  )

  
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export default registerUser;
