import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { tokenService } from "../service/token.service";

export interface IAuthRequest extends Request {
  user: {
    userId: string;
  };
}

class UserController {
  async getUser(req: IAuthRequest, res: Response) {
    const existsUser = await UserModel.findById(req.user.userId);

    if (!existsUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(existsUser);
  }
}

export const userController = new UserController();
