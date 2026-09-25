import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.ts";

export const suMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
        next(new AppError("Authentication required", 401))
        return
    }

    if (!req.user.is_superuser) {
        next(new AppError('Forbidden', 403))
        return
    }

    next()
}