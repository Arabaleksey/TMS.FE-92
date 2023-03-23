import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "../controllers/user.controller";
import { tokenService } from "../service/token.service";

export const authMiddleware = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const payload = tokenService.verifyAuthToken(
    req.headers.authorization?.split(" ")[1]
  );

  if (!payload) {
    return res.status(401).json("Unauthorized");
  }

  req.user = {
    userId: payload.userId,
  };

  next();
};
