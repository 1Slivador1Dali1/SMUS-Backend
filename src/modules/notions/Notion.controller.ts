import type { NotionService } from "./Notion.service.ts";
import type { Request, Response } from "express";

export class NotionController {
  private notionService: NotionService;

  constructor(notionService: NotionService) {
    this.notionService = notionService;
  }

  getAllNotions = async (req: Request, res: Response) => {
    const notions = await this.notionService.getAllNotions();
    res.status(200).json(notions);
  };

  getNotionById = async (req: Request, res: Response) => {
    const notionId = req.params.id ?? "";
    const notion = await this.notionService.getNotionsById(notionId);

    res.status(200).json(notion);
  };

  createNotion = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newNotion = await this.notionService.createNotion({
      name,
      description,
    });
    res.status(201).json(newNotion);
  };

  updateNotion = async (req: Request, res: Response) => {
    const notionId = req.params.id ?? "";
    const { name, description } = req.body;
    const updatedNotion = await this.notionService.updateNotion(notionId, {
      name,
      description,
    });

    res.status(200).json(updatedNotion);
  };

  deleteNotion = async (req: Request, res: Response): Promise<void> => {
    const notionId = req.params.id ?? "";
    await this.notionService.deleteNotion(notionId);
    res.status(204).send();
  };
}
