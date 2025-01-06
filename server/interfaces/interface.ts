import { Document } from "mongodb";

export interface ITask extends Document {
 title: string;
 description?: string;
 quadrant:
  | "urgent-important"
  | "not-urgent-important"
  | "urgent-not-important"
  | "not-urgent-not-important";
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tasks?: ITask[];
  comparePassword: (password: string) => Promise<boolean>;
}
