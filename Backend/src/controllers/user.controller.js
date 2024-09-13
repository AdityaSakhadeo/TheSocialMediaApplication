import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/APIResponse.js";

const genrateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while genrating the access and refresh token"
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
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
  const existedUser = await User.findOne({
    $or: [{ username }, { email }], //to be changed when once used
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "The user with this username or email already exists"
    );
  }

  //Dealing the with the image uploading
  // const profilePhotoPath = req.files?.profilePhoto[0]?.path;

  // if(!profilePhotoPath){
  //   throw new ApiError(400, "Please upload a profile photo");
  // }

  // const profilePhoto = await uploadOnCloudinary(profilePhotoPath);
  //This will return the URL of the profile photo

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullName,
    phoneNumber,
    profilePhoto: "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refereshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User created registered successfully")
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if both fields are provided
  if (!(email || password || username)) {
    throw new ApiError(
      400,
      "Please provide both username or email and password"
    );
  }

  // Find the user by email or username
  //method 1:
  // const user = username == 'null' ? await User.findOne({ email }).select("+password") : await User.findOne({ username }).select('+password');

  //method 2:
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found with this username or email");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  //Dealing with the tokens
  const {accessToken,refreshToken} = await genrateAccessAndRefreshTokens(user._id);

  //sending the cookies
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );  //Getting the user details with the refresh token genrated in the function above

  const options = {
    httpOnly: true,
    secure:true
  }

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(200,{user:loggedInUser,refreshToken,accessToken},"Login Successful")
  )
});

export const logoutUser = asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset:{
        refreshToken:1
      }
    },
    {
      new:true
    }
  )

  const options = {
    httpOnly: true,
    secure:true
  }

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"User logged out"))
})
