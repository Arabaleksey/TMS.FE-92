import mongoose, { Model, Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  username: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export const UserModel: Model<IUser> = mongoose.model("User", userSchema);
