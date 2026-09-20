import type { Request, Response } from "express";
import type { TaskService } from "./Task.service.ts";

export class TaskController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  getAllTasks = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const tasks = await this.service.getAllTasks(userId ?? "");
    res.status(200).json(tasks);
  };
}
