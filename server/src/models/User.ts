import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/interface";

const userSchema = new Schema<IUser>({
 email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  index: true,
 },
 password: {
  type: String,
  required: true,
 },
});

export const User = model<IUser>("User", userSchema);
