import type { Pool } from "pg";
import type { ITasks, ITask } from "./Task.model.ts";

export class TaskRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(id: string): Promise<ITasks> {
    const result = await this.pool.query<ITask>(
      "SELECT * FROM tasks WHERE created_by=$1 OR responsible_id=$1",
      [id],
    );

    return {
      items: result.rows,
    };
  }
}
