import { Router } from "express";
import { NotionController } from "./Notion.controller.ts";
import type { AuthConfig } from "../auth/Auth.model.ts";
import { authMiddleware } from "../../middlewares/authMiddleware.ts";

export const createNotionRouter = (
  notionController: NotionController,
  authConfig: AuthConfig,
): Router => {
  const router = Router();
  router.use(authMiddleware(authConfig));
  router.get("/", notionController.getAllNotions);
  router.get("/:id", notionController.getNotionById);
  router.post("/", notionController.createNotion);
  router.patch("/:id", notionController.updateNotion);
  router.delete("/:id", notionController.deleteNotion);

  return router;
};
