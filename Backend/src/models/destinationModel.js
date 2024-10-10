import mongoose, { Schema } from "mongoose";

const destinationSchema = new Schema(
  {
    followers: {
      type: [Number],
      default: [],
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
    },
    subImages: {
      type: [String],
      default: [],
    },
    posts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("destinations", destinationSchema);

export default Destination;
