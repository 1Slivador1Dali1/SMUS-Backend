import { Router } from "express";
import { UserController } from "./User.controller.ts";

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();

  router.post("/", userController.createUser);
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.patch("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);
  router.get("/:id/metrics", userController.getUserMetrics);
  // #TODO: Add-Update Metric User
  // #TODO: Add Weight History
  router.get("/:id/weight", userController.getAllWeightHistory);
  return router;
};
