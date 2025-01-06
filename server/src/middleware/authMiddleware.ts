import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface DecodedToken {
 sub: string;
 exp: number;
}
export interface IGetUserAuthInfoRequest extends Request {
 user: string; // or any other type
}

export const requireAuth = async (
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> => {
 try {
  // Read token off cookies
  const token = req.cookies.Authorization;

  // Decode the token
  if (!process.env.JWT_SECRET) {
   res.sendStatus(500); // Internal Server Error if JWT_SECRET is not defined
   return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
  // Check Expiration
  if (Date.now() > decoded.exp * 1000) {
   res.sendStatus(401); // Multiply by 1000 to convert to milliseconds
   return;
  }
  // Find user using decoded sub
  const user = await User.findById(decoded.sub);
  if (!user) {
   res.sendStatus(401);
   return;
  }
  // attach user to req
  Object.assign(req, { user: { id: user._id.toString() } });

  // continue
  next();
 } catch (err) {
  res.sendStatus(401);
  return;
 }
};
