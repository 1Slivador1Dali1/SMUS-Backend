import { AppError } from "../../utils/AppError.ts";
import type { CreateTaskDTO, ITask, ITasks } from "./Task.model.ts";
import type { TaskRepository } from "./Task.repository.ts";

export class TaskService {
  private repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  async getAllTasks(userId: string): Promise<ITasks> {
    if (!userId) {
      throw new AppError("Invalid credentials", 401);
    }
    return await this.repository.findAll(userId);
  }

  async getTaskById(id: string): Promise<ITask | null> {
    return (await this.repository.findById(id)) || null
  }

  async create(taskData: CreateTaskDTO): Promise<ITask> {
    if (!taskData.name || !taskData.created_by) {
      throw new AppError("Name and created_by are required", 400)
    }

    return this.repository.create(taskData)
  }

  async updateTask(id: string, updates: Partial<CreateTaskDTO>): Promise<ITask> {
    if (!updates.name && !updates.description && !updates.created_by && !updates.responsible_id) {
      throw new AppError("At least one field must be provided for update", 400);
    }

    const updatedTask = await this.repository.update(id, updates)

    if (!updatedTask) {
      throw new AppError("Task not found", 404)
    }

    return updatedTask
  }

  async deleteTask(id: string): Promise<void> {
    const isDeleted = await this.repository.delete(id)

    if (!isDeleted) {
      throw new AppError('Task not found', 404)
    }
  }
}
