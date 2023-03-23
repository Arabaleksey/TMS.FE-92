import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

class TokenService {
  createTokens(userId: string) {
    const authToken = jwt.sign({ userId }, process.env.AUTH_JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      authToken,
      refreshToken,
    };
  }

  verifyAuthToken(authToken: string): { userId: string } | null {
    try {
      const payload = jwt.verify(authToken, process.env.AUTH_JWT_SECRET);

      return payload as { userId: string };
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

      return payload as { userId: string };
    } catch (error) {
      return null;
    }
  }
}

export const tokenService = new TokenService();
