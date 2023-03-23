import { Request, Response } from "express";
import { tokenService } from "../service/token.service";
import { IAuthRequest } from "./user.controller";
import { UserModel } from "../models/user.model";
import { IUser } from "../models/user.model";
import bcrypt from "bcrypt";

class AuthController {
  refreshToken(req: IAuthRequest, res: Response) {
    const payload = tokenService.verifyRefreshToken(req.body.token);

    if (!payload) {
      return res.status(401).json("Unauthorized");
    }

    const token = tokenService.createTokens(payload.userId);

    return res.json(token);
  }

  async register(req: Request<any, any, IUser>, res: Response) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({
          message: "Invalid fields",
        });
      }

      const existsUser = await UserModel.findOne({
        email,
      });

      if (existsUser) {
        return res.status(400).json({
          message: "User already exists with the same email",
        });
      }

      const user = new UserModel({
        email,
        username,
      });

      const hashedPassword = await bcrypt.hash(password, 14);

      user.password = hashedPassword;

      const createdUser = await user.save();

      const tokens = tokenService.createTokens(`${user._id}`);

      return res.status(201).json({
        createdUser,
        authToken: tokens.authToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async login(
    req: Request<any, any, { email: string; password: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Wrong email or password",
        });
      }

      const user = await UserModel.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          message: "Wrong email or password",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Wrong email or password",
        });
      }

      const tokens = tokenService.createTokens(`${user._id}`);

      return res.json({
        user,
        authToken: tokens.authToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export const authController = new AuthController();
