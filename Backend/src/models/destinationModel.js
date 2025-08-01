import mongoose, { Schema } from "mongoose";

const pointsSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
})

const destinationSchema = new Schema(
  {
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    name: {
      type: String,
      lowercase: true,
      required: true,
    },

    points: [pointsSchema],

    destinationImages: {
      type: [String],
      default: [],
    },
    safety: {
      type: Number,
      default: 0,
    },
    accessibility: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const Destination = mongoose.model("destinations", destinationSchema);

export default Destination;
