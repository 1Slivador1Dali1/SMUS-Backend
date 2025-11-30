import type { Pool } from "pg";
import type { INotion, INotions } from "./Notion.model.ts";

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

  // create(notion: Omit<INotion, "id">): INotion {
  //   const newNotion: INotion = {
  //     id: String(this.notions.items.length + 1),
  //     ...notion,
  //   };

  //   this.notions.items.push(newNotion);

  //   return newNotion;
  // }

  // update(id: string, updates: Partial<Omit<INotion, "id">>): INotion | null {
  //   const notion = this.findById(id);

  //   if (!notion) return null;

  //   if (updates.name) notion.name = updates.name;
  //   if (updates.description) notion.description = updates.description;

  //   return notion;
  // }

  // delete(id: string): boolean {
  //   const index = this.notions.items.findIndex((n) => n.id === id);

  //   if (index === -1) return false;

  //   this.notions.items.splice(index, 1);
  //   return true;
  // }
}
