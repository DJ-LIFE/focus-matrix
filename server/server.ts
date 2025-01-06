import { Request, Response } from "express";
import app from "./src/app";
import mongoose from "mongoose";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
 console.error("MONGO_URI is not defined in the environment variables");
 process.exit(1);
}
const connectToDb = async () => {
 try {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to the database");
 } catch (error) {
  console.error("Error connecting to the database: ", error);
 }
};
connectToDb();

app.get("/", (req: Request, res: Response) => {
 res.send("Hello from the server");
});

app.listen(process.env.PORT, () => {
 console.log(`Server is running on port 8081`);
});
