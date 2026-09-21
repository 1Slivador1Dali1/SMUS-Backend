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
  router.get("/:id", taskController.getTaskById)
  router.post("/", taskController.create)
  router.patch("/:id", taskController.update)
  router.delete("/:id", taskController.delete)

  return router;
};
