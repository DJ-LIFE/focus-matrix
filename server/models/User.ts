import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
})

userSchema.pre('save', async function (next) {
    const user = this as IUser;
    if(!user.inModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
})

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}

export const User = model<IUser>('User', userSchema);