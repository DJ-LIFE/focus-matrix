import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
 user: {
  id: string;
 };
}
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
 const { username, email, password } = req.body;
 try {
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: "User created successfully" });
 } catch (error) {
  res.status(500).json({ message: "Internal server error" });
 }
};

export const login = async (req: Request, res: Response) => {
 const { email, password } = req.body;
 try {
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
   return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
   expiresIn: "1h",
  });
  res.json({ token });
 } catch (error: any) {
  res.status(500).json({ error: error.message });
 }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
 try {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
 } catch (error: any) {
  res.status(500).json({ error: error.message });
 }
};
