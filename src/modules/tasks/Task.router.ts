import { Router } from "express";
import type { TaskController } from "./Task.controller.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";
import type { AuthConfig } from "../auth/Auth.model.ts";

export const createTaskRouter = (
  taskController: TaskController,
  authConfig: AuthConfig,
): Router => {
  const router = Router();
  router.use(authMiddleware(authConfig));
  router.get("/", taskController.getAllTasks);

  return router;
};
