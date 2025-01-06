import mongoose from "mongoose";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
 throw new Error("MONGO_URL is not defined in the environment variables");
}
const connectToDB = async () => {
 try {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to the database");
 } catch (error) {
  console.error("Error connecting to the database:", error);
  process.exit(1);
 }
};

export default connectToDB;
