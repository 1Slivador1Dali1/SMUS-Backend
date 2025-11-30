import { NotionController } from "./Notion.controller.ts";
import type { INotions } from "./Notion.model.ts";
import { NotionRepository } from "./Notion.repository.ts";
import { NotionService } from "./Notion.service.ts";
import { createNotionRouter } from "./Notion.router.ts";
import type { Pool } from "pg";

export const initializeNotionModule = (pool: Pool) => {
  const repository = new NotionRepository(pool);
  const service = new NotionService(repository);
  const controller = new NotionController(service);
  const router = createNotionRouter(controller);

  return { repository, service, controller, router };
};
