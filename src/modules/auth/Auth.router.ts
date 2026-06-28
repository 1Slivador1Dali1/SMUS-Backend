import { Router } from "express";
import { AuthController } from "./Auth.controller.ts";
import type { AuthConfig } from "./Auth.model.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";

export const createAuthRouter = (
  authController: AuthController,
  authConfig: AuthConfig,
): Router => {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.use(authMiddleware(authConfig));
  router.get("/me", authController.me);
  return router;
};
