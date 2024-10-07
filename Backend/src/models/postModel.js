import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    owner: {//
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
    safety: {//
      type: Number,
      required: true,
    },
    accessibility: {//
      type: Number,
      required: true,
    },
    cost: {//
      type: Number,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    averageStars: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {//
      type: String,
      required: true,
    },
    caption: {//
      type: String,
      required: true,
    },
    comments: {
      type: [String],
      default: [],
    },
    destination: {//
      type: Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

export default Post;

