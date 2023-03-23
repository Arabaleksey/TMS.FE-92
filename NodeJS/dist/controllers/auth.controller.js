"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const token_service_1 = require("../service/token.service");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    refreshToken(req, res) {
        const payload = token_service_1.tokenService.verifyRefreshToken(req.body.token);
        if (!payload) {
            return res.status(401).json("Unauthorized");
        }
        const token = token_service_1.tokenService.createTokens(payload.userId);
        return res.json(token);
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, username } = req.body;
                if (!email || !password || !username) {
                    return res.status(400).json({
                        message: "Invalid fields",
                    });
                }
                const existsUser = yield user_model_1.UserModel.findOne({
                    email,
                });
                if (existsUser) {
                    return res.status(400).json({
                        message: "User already exists with the same email",
                    });
                }
                const user = new user_model_1.UserModel({
                    email,
                    username,
                });
                const hashedPassword = yield bcrypt_1.default.hash(password, 14);
                user.password = hashedPassword;
                const createdUser = yield user.save();
                const tokens = token_service_1.tokenService.createTokens(`${user._id}`);
                return res.status(201).json({
                    createdUser,
                    authToken: tokens.authToken,
                    refreshToken: tokens.refreshToken,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({
                        message: "Wrong email or password",
                    });
                }
                const user = yield user_model_1.UserModel.findOne({
                    email,
                });
                if (!user) {
                    return res.status(400).json({
                        message: "Wrong email or password",
                    });
                }
                const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordCorrect) {
                    return res.status(400).json({
                        message: "Wrong email or password",
                    });
                }
                const tokens = token_service_1.tokenService.createTokens(`${user._id}`);
                return res.json({
                    user,
                    authToken: tokens.authToken,
                    refreshToken: tokens.refreshToken,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
}
exports.authController = new AuthController();
