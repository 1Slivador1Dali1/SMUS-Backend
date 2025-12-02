import { error } from "console";
import type { NotionService } from "./Notion.service.ts";
import type { Request, Response } from "express";

export class NotionController {
  private notionService: NotionService;

  constructor(notionService: NotionService) {
    this.notionService = notionService;
  }

  getAllNotions = async (req: Request, res: Response) => {
    try {
      const notions = await this.notionService.getAllNotions();
      res.status(200).json(notions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getNotionById = async (req: Request, res: Response) => {
    try {
      const notionId = req.params.id;

      if (!notionId) {
        res.status(400).json({ error: "Id is required" });
        return;
      }

      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(notionId)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      const notion = await this.notionService.getNotionsById(notionId);

      if (!notion) {
        res.status(404).json({ error: "Notion not found" });
        return;
      }

      res.status(200).json(notion);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  createNotion = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).json({ error: "Name and description required" });
      }

      if (typeof name !== "string" || typeof description !== "string") {
        return res
          .status(400)
          .json({ error: "Name and description must be strings" });
      }

      const newNotion = await this.notionService.createNotion({
        name,
        description,
      });
      res.status(201).json(newNotion);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  updateNotion = async (req: Request, res: Response) => {
    try {
      const notionId = req.params.id;

      if (!notionId) {
        res.status(400).json({ error: "Id is required" });
        return;
      }
      const { name, description } = req.body;

      if (!name && !description) {
        return res
          .status(400)
          .json({ error: "Not specified, at least one field to update" });
      }

      const updatedNotion = this.notionService.updateNotion(notionId, {
        name,
        description,
      });

      res.status(200).json(updatedNotion);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteNotion = async (req: Request, res: Response): Promise<void> => {
    try {
      const notionId = req.params.id;

      if (!notionId) {
        res.status(400).json({ error: "Id is required" });
        return;
      }

      await this.notionService.deleteNotion(notionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
