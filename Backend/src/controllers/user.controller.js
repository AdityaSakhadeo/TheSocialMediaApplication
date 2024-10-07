import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/APIResponse.js";
/**
 * @description : Function to genrate the access and refresh token
 * @route : integrated function
 * @access : Private
 */

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

/**
 * @description : Function to register the user
 * @route : /api/v1/users/register
 * @access : Public
 */

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, fullName, password } = req.body;

  // Ensure either email or phone number is provided
  if (!email && !phoneNumber) {
   return res
   .status(400)
   .json(new ApiResponse(400,null,"Please enter either Phone number or email address"))
  }

  // Sanitize inputs (make sure null values are handled correctly)
  const sanitizedEmail = email?.trim() === "" ? null : email?.trim();
  const sanitizedPhone =
    phoneNumber?.trim() === "" ? null : phoneNumber?.trim();

  // Validate other required fields
  if ([username, fullName, password].some((field) => field?.trim() === "")) {
    return res
    .status(200)
    .json(new ApiResponse(400,null,"Please fill in all required fields"));
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
    return res
    .status(400)
    .json(new ApiResponse(400,null,"The user with this username already exists"));
  }
  if (existedUserEmail) {
    return res
    .status(400)
    .json(new ApiResponse(400,null,"The user with this email already exists"));
  }
  if (existedUserPhoneNumber) {
    return res
    .status(400)
    .json(new ApiResponse(400,null,"The user with this email already exists"));
  }


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
      return res
      .status(500)
      .json(new ApiResponse(500,null,"Server error while creating the new user"));
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

/**
 * @description : Function to login the user
 * @route : /api/v1/users/login
 * @access : Public
 */

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

/**
 * @description : Function to update the profile of the user
 * @route : /api/v1/users/editProfile
 * @access : /Private
 */

export const editProfile = asyncHandler(async (req, res) => {
  const { currentUserId, updateField, newData } = req.body;
  const user = await User.findById(currentUserId).select(
    "-password -refreshToken"
  );

  if (!user) {
    return res.status(401).json(new ApiResponse(401, null, "User not found"));
  }

  switch (updateField) {
    case "username":
      const isUsernameExist = await User.findOne({
        username: newData.toLowerCase(),
      });
      if (isUsernameExist) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Username already exist"));
      }
      user.username = newData.toLowerCase();
      await user.save({ validateBeforeSave: false });
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Username updated successfully"));
      break;

    case "email":
      if (!newData.includes("@")) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Invalid email"));
      }

      if (user.email === newData) {
        console.log("I am here");
        return res
          .status(400)
          .json(new ApiResponse(400, null, "You have provided the same email"));
      }

      const isEmailExist = await User.findOne({ email: newData.toLowerCase() });
      if (isEmailExist) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Email already exist"));
      }

      user.email = newData.toLowerCase();
      await user.save({ validateBeforeSave: false });
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Email updated successfully"));

    case "phoneNumber":
      const mobile = /^[0-9]{10}$/;
      if (!mobile.test(newData)) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Invalid Phone Number"));
      }

      if (user.phoneNumber === newData) {
        return res
          .status(200)
          .json(
            new ApiResponse(
              400,
              null,
              "You have provided the same phone number"
            )
          );
      }

      const isPhoneNumberExist = await User.findOne({ phoneNumber: newData });
      if (isPhoneNumberExist) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              null,
              "Other account already registered with this phone number"
            )
          );
      }

      user.phoneNumber = newData;
      await user.save({ validateBeforeSave: false });
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Phone Number Updated successfully"));

    case "fullName":
      if (!newData) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Full name can not be empty"));
      }
      user.fullName = newData;
      await user.save({ validateBeforeSave: false });
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Full Name updated successfully"));

    case "profilePhoto":

      const profilePhotoPath = req.files?.newData[0]?.path;
      // console.log("profilePhotoPath::::",profilePhotoPath);
      if (!profilePhotoPath) {
        throw new ApiError(400, "Please upload a profile photo");
      }
      const profilePhoto = await uploadOnCloudinary(profilePhotoPath);
      // console.log("Profile Photo:::::",profilePhoto);
      user.profileImage = profilePhoto.url;
      await user.save({ validateBeforeSave: false });
      return res
      .status(200)
      .json(new ApiResponse(200, profilePhoto.url, "Profile Photo updated successfully"));
    default:
      break;
  }
});

/**
 * @description : Function to logout the user
 * @route : /api/v1/users/logout
 * @access : Private
 */

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


/**
 * @description : Function to get the user information
 * @route : /api/v1/users/getUserProfile
 * @access : Public
 */

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username: username.toLowerCase() }).select(
    "-password -refreshToken"
  );

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User with this username not found!!"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile retrived successfully"));
});

/**
 * @description : Control flow used for following the user
 * @route : /api/v1/users/follow
 * @access : Private
 */

export const followUser = asyncHandler(async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  const targetUser = await User.findById(targetUserId);
  const currentUser = await User.findById(currentUserId);

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
 * @description : Function to get the data of the suggested users
 * @route : /api/v1/users/getUserSuggestion
 * @access : Private
 */

export const suggestRelevantUsers = asyncHandler(async (req, res) => {
  const { currentUserId } = req.query;

  const currentUser = await User.findById(currentUserId).select(
    "-password -refreshToken"
  );

  if (!currentUser) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const followedPeopleIds = currentUser.followedPeople.map((user) => user._id);

  let suggestedUsers = await User.find({
    _id: { $nin: [...followedPeopleIds, currentUserId] },
    followers: { $in: followedPeopleIds },
  }).limit(10);

  if (suggestedUsers.length === 0) {
    suggestedUsers = await User.aggregate([
      { $match: { _id: { $nin: [...followedPeopleIds, currentUserId] } } },
      { $sample: { size: 5 } },
      { $project: { password: 0, refreshToken: 0 } },
    ]);
  }

  suggestedUsers = suggestedUsers.filter(user => user._id.toString() !== currentUserId);
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        suggestedUsers,
        "Relevant users suggested successfully"
      )
    );
});

