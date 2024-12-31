import mongoose from "mongoose";
import dotenv from "dotenv";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL;
if (!MONGO_URI) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}
const connectToDB = async () => {
 try {
  await mongoose.connect(MONGO_URI);
 } catch (error) {
  console.error("Error connecting to the database:", error);
  process.exit(1);
 }
};

export default connectToDB;
