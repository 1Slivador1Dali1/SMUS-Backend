import type { Pool } from "pg";
import { AuthRepository } from "./Auth.repository.ts";
import { AuthService } from "./Auth.service.ts";
import { AuthController } from "./Auth.controller.ts";
import { createAuthRouter } from "./Auth.router.ts";
import type { AuthConfig } from "./Auth.model.ts";

export const initializeAuthModule = (pool: Pool, authConfig: AuthConfig) => {
  const repository = new AuthRepository(pool);
  const service = new AuthService(repository, authConfig);
  const controller = new AuthController(service);
  const router = createAuthRouter(controller, authConfig);
  return { repository, service, controller, router };
};
