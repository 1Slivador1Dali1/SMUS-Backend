import { NotionController } from "./Notion.controller.ts";
import { NotionRepository } from "./Notion.repository.ts";
import { NotionService } from "./Notion.service.ts";
import { createNotionRouter } from "./Notion.router.ts";
import type { Pool } from "pg";
import type { AuthConfig } from "../auth/Auth.model.ts";

export const initializeNotionModule = (pool: Pool, authConfig: AuthConfig) => {
  const repository = new NotionRepository(pool);
  const service = new NotionService(repository);
  const controller = new NotionController(service);
  const router = createNotionRouter(controller, authConfig);

  return { repository, service, controller, router };
};
