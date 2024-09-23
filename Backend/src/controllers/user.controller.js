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

  // Ensure either email or phone number is provided
  if (!email && !phoneNumber) {
    throw new ApiError(
      400,
      "Please enter either phone number or email address"
    );
  }

  // Sanitize inputs (make sure null values are handled correctly)
  const sanitizedEmail = email?.trim() === "" ? null : email?.trim();
  const sanitizedPhone =
    phoneNumber?.trim() === "" ? null : phoneNumber?.trim();

  // Validate other required fields
  if ([username, fullName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill all the fields");
  }

  // Check if the username, email, or phone number already exists
  const existedUser = await User.findOne({ username: username.toLowerCase() });
  const existedUserEmail = sanitizedEmail
    ? await User.findOne({ email: sanitizedEmail })
    : null;
  const existedUserPhoneNumber = sanitizedPhone
    ? await User.findOne({ phoneNumber: sanitizedPhone })
    : null;

  if (existedUser) {
    throw new ApiError(409, "The user with this username already exists");
  }
  if (existedUserEmail) {
    throw new ApiError(409, "The user with this email already exists");
  }
  if (existedUserPhoneNumber) {
    throw new ApiError(409, "The user with this phone number already exists");
  }

  if (existedUser) {
    throw new ApiError(409, "The user with this username already exists");
  }
  if (existedUserEmail) {
    throw new ApiError(409, "The user with this email already exists");
  }
  if (existedUserPhoneNumber) {
    throw new ApiError(409, "The user with this phone number exists");
  }

  //Dealing the with the image uploading
  // const profilePhotoPath = req.files?.profilePhoto[0]?.path;

  // if(!profilePhotoPath){
  //   throw new ApiError(400, "Please upload a profile photo");
  // }

  // const profilePhoto = await uploadOnCloudinary(profilePhotoPath);
  //This will return the URL of the profile photo

  try {
    const user = await User.create({
      username: username.toLowerCase(),
      email: sanitizedEmail, // Store null if email is not provided
      password,
      fullName,
      phoneNumber: sanitizedPhone, // Store null if phone number is not provided
      profileImage: "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refereshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          createdUser,
          "User created registered successfully"
        )
      );
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json(new ApiResponse(400, "", messages));
    }
    throw new ApiError(500, "Server Error");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { input, logintype, password } = req.body;

  // Check if both fields are provided
  if (!(input || logintype || password)) {
    throw new ApiError(400, "Please provide correct input and password");
  }

  // Find the user by email or username
  //method 1:
  // const user = username == 'null' ? await User.findOne({ email }).select("+password") : await User.findOne({ username }).select('+password');

  //method 2:
  console.log("Input", input);
  console.log("logintype", logintype);
  console.log("password", password);
  let user = null;
  try {
    if (logintype === "email") {
      user = await User.findOne({ email: input });
    } else if (logintype === "phoneNumber") {
      user = await User.findOne({ phoneNumber: input });
    } else {
      user = await User.findOne({ username: input });
    }
  } catch (error) {
    throw new ApiError(500, "An error occurred while fetching the user");
  }

  console.log("User::: ", user);
  if (!user) {
    throw new ApiError(404, "User not found with this username or email");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  //Dealing with the tokens
  const { accessToken, refreshToken } = await genrateAccessAndRefreshTokens(
    user._id
  );

  //sending the cookies
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); //Getting the user details with the refresh token genrated in the function above

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "Login Successful"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

//Function to upload the photo on cloudinary
export const uploadProfileImage = asyncHandler(async (req, res) => {
  try {
    const { user_id } = req.body;
    const profileImagePath = req.files?.avatar[0]?.path;
    if (!profileImagePath) {
      return new ApiResponse(400, null, "Image source not received");
    }
    const profileImage = uploadOnCloudinary(profileImagePath);

    if (!profileImage) {
      return new ApiResponse(400, null, "Image source not received");
    }

    const user = User.findById(user_id);
    if (!user) {
      return new ApiResponse(404, null, "User not found");
    }
    user.profileImage = profileImage;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile image uploaded successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while uploading profile image");
  }
});


/**
 * @description : Function to get the user information
 * @route : /api/v1/users/getUserProfile
 * @access : Public
 */

export const getUserProfile = asyncHandler(async(req,res)=>{
  
  const {username} = req.body;

  const user = await User.findOne({ username: username.toLowerCase() })
  .select("-password -refreshToken")

  if (!user) {
    return json(new ApiResponse(400,null,"User with this username not found!!"));
  }
  return res
  .status(200)
  .json(new ApiResponse(200,user,"User profile retrived successfully"));
})

/**
 * @description : Control flow used for following the user
 * @route : /api/v1/users/follow
 * @access : Private
 */

export const follow = asyncHandler((req,res)=>{
  const {currentUserId,targetUserId} = req.body;
})
