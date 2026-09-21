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

  getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id ?? "";
    const task = await this.service.getTaskById(taskId);

    res.status(200).json(task);
  };

  create = async (req: Request, res: Response) => {
    const { name, description, created_by, responsible_id } = req.body;
    const newTask = await this.service.create({
      name,
      description,
      created_by,
      responsible_id
    });
    res.status(201).json(newTask);
  };

  update = async (req: Request, res: Response) => {
    const taskId = req.params.id ?? "";
    const { name, description, created_by, responsible_id } = req.body;
    const updatedTask = await this.service.updateTask(taskId, {
      name,
      description,
      created_by,
      responsible_id
    });

    res.status(200).json(updatedTask);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id ?? "";
    await this.service.deleteTask(taskId);
    res.status(204).send();
  };
}
