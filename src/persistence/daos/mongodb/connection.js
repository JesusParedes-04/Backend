import mongoose from "mongoose";
import { CONNECTION_LOCAL_MONGO } from "../../../config.js";

export const connectionString = process.env.CONNECTION_LOCAL_MONGO

// export const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@projects.eqzetk6.mongodb.net/?retryWrites=true&w=majority`;



export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log(error);
  }
};