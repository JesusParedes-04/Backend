import mongoose from "mongoose";
import { CONNECTION_LOCAL_MONGO } from "../../../config.js";

export const connectionString = CONNECTION_LOCAL_MONGO




export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log(error);
  }
};