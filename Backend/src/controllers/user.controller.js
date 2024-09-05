import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { User } from "../models/userModel.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phone, fullName, password } = req.body;

  //Checking if all the fields are received or not
  if (
    [username, email, phone, fullName, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  //Add more validations here if necessary

  //Now check if the user is already there or not by checking if username or email is already there
  const existedUser=User.findOne({
    $or: [{ username }, { email }],  //to be changed when once used
  });

  if (!existedUser) {
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
    email,
    fullName,
    phone,
    password,
    profilePhoto:profilePhoto?.url || ""
  })

  const createdUser = await User.findById(user._id);
  
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export default registerUser;
