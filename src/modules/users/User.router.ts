import { Router } from "express";
import { UserController } from "./User.controller.ts";
import type { AuthConfig } from "../auth/Auth.model.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import { suMiddleware } from "../../middlewares/suMiddleware.ts";

export const createUserRouter = (
  userController: UserController,
  authConfig: AuthConfig,
): Router => {
  const router = Router();
  router.use(authMiddleware(authConfig));
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.patch("/:id", userController.updateUser);
  router.delete("/:id", suMiddleware, userController.deleteUser);
  return router;
};
