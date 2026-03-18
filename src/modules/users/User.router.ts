import { Router } from "express";
import { UserController } from "./User.controller.ts";

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();

  router.post("/", userController.createUser);
  router.get("/", userController.getAllUsers);

  return router;
};
