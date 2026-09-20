import type { Pool } from "pg";
import { TaskRepository } from "./Task.repository.ts";
import { TaskService } from "./Task.service.ts";
import { TaskController } from "./Task.controller.ts";
import { createTaskRouter } from "./Task.router.ts";
import type { AuthConfig } from "../auth/Auth.model.ts";

export const initializeTaskModule = (pool: Pool, authConfig: AuthConfig) => {
  const repository = new TaskRepository(pool);
  const service = new TaskService(repository);
  const controller = new TaskController(service);
  const router = createTaskRouter(controller, authConfig);
  return { repository, service, controller, router };
};
