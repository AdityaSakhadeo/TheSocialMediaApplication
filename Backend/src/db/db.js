import mongoose from "mongoose";
import  {DB_NAME}  from "../constants.js";
import dotenv from 'dotenv';

dotenv.config();

//Function to connect the database to the express APIs
const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log("\nDatabase connected successfully");
    console.log(`\nDatabase host is:: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Mongo DB connection error::: ", error);
    process.exit(1);
  }
};

export default connectDB;