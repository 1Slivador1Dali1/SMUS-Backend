import type { Pool } from "pg";
import type { CreateNotionDto, INotion, INotions } from "./Notion.model.ts";

export class NotionRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<INotions> {
    const result = await this.pool.query<INotion>(
      "SELECT id, name, description, created_at, updated_at FROM notions ORDER BY created_at DESC"
    );

    return {
      items: result.rows,
    };
  }

  async findById(id: string): Promise<INotion | null> {
    const result = await this.pool.query<INotion>(
      "SELECT id, name, description, created_at, updated_at FROM notions WHERE id = $1",
      [id]
    );

    return result.rows[0] || null;
  }

  async create(notion: CreateNotionDto): Promise<INotion> {
    const result = await this.pool.query<INotion>(
      "INSERT INTO notions (name, description) VALUES ($1, $2) RETURNING *",
      [notion.name, notion.description]
    );

    return result.rows[0] as INotion;
  }

  async update(
    id: string,
    updates: Partial<CreateNotionDto>
  ): Promise<INotion | null> {
    const updateFields = Object.keys(updates).filter(
      (key) => updates[key as keyof CreateNotionDto] !== undefined
    );

    const setClause = updateFields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");

    const fullSetClause = `${setClause}, updated_at = NOW()`;

    const params: any[] = [id];
    updateFields.forEach((field) => {
      params.push(updates[field as keyof CreateNotionDto]);
    });

    const query = `
    UPDATE notions 
    SET ${fullSetClause}
    WHERE id = $1
    RETURNING *
  `;

    const result = await this.pool.query<INotion>(query, params);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM notions WHERE id=$1", [
      id,
    ]);

    return (result.rowCount ?? 0) > 0;
  }
}
