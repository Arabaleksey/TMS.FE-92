import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/auth/refresh", authController.refreshToken);
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

export default router;
