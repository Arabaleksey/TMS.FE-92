import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { userController } from "../controllers/user.controller";

const router = express.Router();

router.get("/user/me", authMiddleware, userController.getUser);

export default router;
