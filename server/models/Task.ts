import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/interface";

const taskSchema = new Schema<ITask>({
 title: { type: String, required: true },
 description: { type: String },
 quadrant: {
  type: String,
  enum: [
   "urgent-important",
   "not-urgent-important",
   "urgent-not-important",
   "not-urgent-not-important",
  ],
  required: true,
 },
});

export default model<ITask>("Task", taskSchema);
