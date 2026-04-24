import { Router } from "express";
import { AuthController } from "./Auth.controller.ts";

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post("/register");
  router.post("/login");
  router.get("/me");
  return router;
};
