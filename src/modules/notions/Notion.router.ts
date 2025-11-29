import { Router } from "express";
import { NotionController } from "./Notion.controller.ts";

export const createNotionRouter = (
  notionController: NotionController
): Router => {
  const router = Router();

  router.get("/", notionController.getAllNotions);
  router.get("/:id", notionController.getNotionById);
  router.post("/", notionController.createNotion);
  router.patch("/id", notionController.updateNotion);
  router.delete("/:id", notionController.deleteNotion);

  return router;
};
