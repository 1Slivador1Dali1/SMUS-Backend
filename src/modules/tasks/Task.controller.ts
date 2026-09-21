import type { Request, Response } from "express";
import type { TaskService } from "./Task.service.ts";

export class TaskController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  getAllTasks = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const tasks = await this.service.getAllTasks(userId);
    res.status(200).json(tasks);
  };

  getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id ?? "";
    const userId = req.user!.id
    const task = await this.service.getTaskById(taskId, userId);

    res.status(200).json(task);
  };

  create = async (req: Request, res: Response) => {
    const { name, description, responsible_id } = req.body;
    const created_by = req.user!.id
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
    const userId = req.user!.id
    const { name, description, status, responsible_id } = req.body;
    const updatedTask = await this.service.updateTask(taskId, {
      name,
      description,
      status,
      responsible_id
    }, userId);

    res.status(200).json(updatedTask);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id ?? "";
    const userId = req.user!.id
    await this.service.deleteTask(taskId, userId);
    res.status(204).send();
  };
}
