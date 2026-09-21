import type { Pool } from "pg";
import type { ITasks, ITask, CreateTaskDTO, UpdateTaskDTO } from "./Task.model.ts";

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

  async findById(id: string): Promise<ITask | null> {
    const result = await this.pool.query<ITask>('SELECT * FROM tasks WHERE id=$1', [id])
    return result.rows[0] || null
  }

  async create(task: CreateTaskDTO): Promise<ITask> {
    const result = await this.pool.query<ITask>("INSERT INTO tasks (name, description, created_by, responsible_id) VALUES ($1, $2, $3, $4) RETURNING *", [task.name, task.description ?? null, task.created_by, task.responsible_id ?? null])
    return result.rows[0] as ITask
  }

  async update(id: string, updates: Partial<UpdateTaskDTO>): Promise<ITask | null> {
    const ALLOWED_FIELDS: (keyof UpdateTaskDTO)[] = ["name", "description", "status", "responsible_id"]

    const updateFields = ALLOWED_FIELDS.filter(
      (key) => updates[key] !== undefined
    )

    if (updateFields.length === 0) {
      return this.findById(id)
    }

    const setClause = updateFields.map((field, index) => `${field} =$${index + 2}`).join(", ")

    const fullSetClause = `${setClause}, updated_at = NOW()`;

    const params: any[] = [id]

    updateFields.forEach((field) => {
      params.push(updates[field as keyof UpdateTaskDTO])
    })

    const query = `UPDATE tasks SET ${fullSetClause} WHERE id=$1 RETURNING *`

    const result = await this.pool.query<ITask>(query, params)
    return result.rows[0] || null
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM tasks WHERE id=$1", [id])

    return (result.rowCount ?? 0) > 0
  }
}
