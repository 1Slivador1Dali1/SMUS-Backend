import type { Response, Request, NextFunction } from "express";
import type { AuthConfig } from "../modules/auth/Auth.model.ts";
import { AppError } from "../utils/AppError.ts";
import jwt from "jsonwebtoken";

export const authMiddleware = (authConfig: AuthConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      next(new AppError("Authentication required", 401));
      return;
    }

    const token = header.split(" ")[1];

    if (!token) {
      next(new AppError("Token is required", 401));
      return;
    }

    try {
      const payload = jwt.verify(token, authConfig.jwtSecret) as {
        id: string;
        username: string;
      };
      req.user = payload;
      next();
    } catch {
      next(new AppError("Invalid or expired token", 401));
      return;
    }
  };
};
