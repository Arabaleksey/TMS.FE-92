"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    createTokens(userId) {
        const authToken = jsonwebtoken_1.default.sign({ userId }, process.env.AUTH_JWT_SECRET, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
            expiresIn: "1d",
        });
        return {
            authToken,
            refreshToken,
        };
    }
    verifyAuthToken(authToken) {
        try {
            const payload = jsonwebtoken_1.default.verify(authToken, process.env.AUTH_JWT_SECRET);
            return payload;
        }
        catch (error) {
            return null;
        }
    }
    verifyRefreshToken(refreshToken) {
        try {
            const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
            return payload;
        }
        catch (error) {
            return null;
        }
    }
}
exports.tokenService = new TokenService();
