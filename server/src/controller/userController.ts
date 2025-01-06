import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";

interface SignupRequest extends Request {
 body: {
  email: string;
  password: string;
 };
}

interface LoginRequest extends Request {
 body: {
  email: string;
  password: string;
 };
}

export const signup = async (
 req: SignupRequest,
 res: Response
): Promise<void> => {
 try {
  // Get the email and Password
  const { email, password } = req.body;

  // Hashing the Password
  const hashedPassword = bcrypt.hashSync(password, 8);
  // Create a user with the data
  await User.create({ email, password: hashedPassword });
  // respond
  res.sendStatus(200);
 } catch (err) {
  console.log(err);
  res.sendStatus(400);
 }
};

export const login = async (
 req: LoginRequest,
 res: Response
): Promise<void> => {
 try {
  // Get the email and Password
  const { email, password } = req.body;

  // Find the user with requested email
  const user = await User.findOne({ email });
  if (!user) {
   res.sendStatus(401);
   return;
  }

  // Compare sent in password with found user password hash
  // Load hash from your password DB.
  const passwordMatch = bcrypt.compareSync(password, user.password); // true
  if (!passwordMatch) {
   res.sendStatus(401);
   return;
  }
  // create a jwt token
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  if (!process.env.JWT_SECRET) {
   throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);

  // Set the Cookie
  res.cookie("Authorization", token, {
   expires: new Date(exp),
   httpOnly: true,
   sameSite: "lax",
   secure: process.env.NODE_ENV === "production",
  });
  // sent it
  res.sendStatus(200);
 } catch (err) {
  console.log(err);
  res.sendStatus(401);
 }
};

export const logout = (req: Request, res: Response): void => {
 try {
  res.clearCookie("Authorization");
  res.sendStatus(200);
 } catch (err) {
  console.log(err);
  res.sendStatus(401);
 }
};

export const checkAuth = async (
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> => {
 try {
  console.log("User is authenticated");
  res.sendStatus(200);
 } catch (err) {
  console.log(err);
  res.sendStatus(401);
 }
};
