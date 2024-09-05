import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; //Helps while hashing the password
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is necessary"],
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email:
    {
      type: String,
      default:''
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followedPeople: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followedPages: {
      type: [Schema.Types.ObjectId],
      ref: "destination",
      default: [],
    },
    associatedPosts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
      default: [],
      validate: [
        async function (value) {
          // Check if every ObjectId in the array exists in the 'Post' collection
          const allExist = await Promise.all(
            value.map((id) => mongoose.model("Post").exists({ _id: id }))
          );
          return allExist.every(Boolean);
        },
        "One or more associated posts do not exist",
      ],
    },
    profilePhoto: {
      type: String,
      default: "default.jpg",
    },
    userBio: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// pre hook is used to execute the code just before execution of some
// code before saving the data, thats why save option is given

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//This function returns true if the password is same as typed by the user
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Function to genrate the access token
userSchema.methods.genrateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRETE,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return accessToken;
};

//Function to genrate the refresh token
userSchema.methods.genrateRefreshToken = function () {
    const accessToken = jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRETE,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );
      return accessToken;
};
export const User = mongoose.model("users", userSchema);
