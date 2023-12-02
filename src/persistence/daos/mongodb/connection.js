import mongoose from "mongoose";
import { REMOTE_MONGO_URL } from "../../../config.js";

export const connectionString = REMOTE_MONGO_URL


export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log(error);
  }
};