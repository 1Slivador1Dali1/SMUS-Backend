import { Router } from "express";
import { UserController } from "./User.controller.ts";
import type { AuthConfig } from "../auth/Auth.model.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";

export const createUserRouter = (
  userController: UserController,
  authConfig: AuthConfig,
): Router => {
  const router = Router();
  router.use(authMiddleware(authConfig));
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.patch("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);
  return router;
};
