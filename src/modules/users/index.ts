import type { Pool } from "pg";
import { UserController } from "./User.controller.ts";
import { UserRepository } from "./User.repository.ts";
import { createUserRouter } from "./User.router.ts";
import { UserService } from "./User.service.ts";

export const initializeUserModule = (pool: Pool) => {
  const repository = new UserRepository(pool);
  const service = new UserService(repository);
  const controller = new UserController(service);
  const router = createUserRouter(controller);

  return { repository, service, controller, router };
};
