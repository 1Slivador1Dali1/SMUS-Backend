import { AppError } from "../../utils/AppError.ts";
import type { ITasks } from "./Task.model.ts";
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
}
