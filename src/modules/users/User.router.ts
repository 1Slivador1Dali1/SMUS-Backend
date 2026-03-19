import { Router } from "express";
import { UserController } from "./User.controller.ts";

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();

  router.post("/", userController.createUser);
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  // #TODO: Update User
  router.delete("/:id", userController.deleteUser);
  return router;
};
