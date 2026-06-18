import { Router } from "express";
import { AuthController } from "./Auth.controller.ts";

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", authController.me);
  return router;
};
