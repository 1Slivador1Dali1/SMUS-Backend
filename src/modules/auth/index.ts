import type { Pool } from "pg";
import { AuthRepository } from "./Auth.repository.ts";
import { AuthService } from "./Auth.service.ts";
import { AuthController } from "./Auth.controller.ts";
import { createAuthRouter } from "./Auth.router.ts";

export const initializeAuthModule = (pool: Pool) => {
  const repository = new AuthRepository(pool);
  const service = new AuthService(repository);
  const controller = new AuthController(service);
  const router = createAuthRouter(controller);
  return { repository, service, controller, router };
};
