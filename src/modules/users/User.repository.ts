import type { Pool } from "pg";
import type {
  IUser,
  IUsers,
  UpdateUserDto,
  UserResponse
} from "./User.model.ts";

export class UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IUsers> {
    const result = await this.pool.query<IUser>(
      "SELECT id, username, is_superuser, created_at FROM users ORDER BY created_at DESC",
    );
    return {
      items: result.rows,
    };
  }

  async findById(id: string): Promise<UserResponse | null> {
    const result = await this.pool.query<UserResponse>(
      "SELECT id, username, is_superuser, created_at FROM users WHERE id=$1",
      [id],
    );
    return result.rows[0] || null;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponse | null> {
    const setClauses: string[] = [];
    const values: any[] = [id];
    let paramIndex = 2;

    if (data.username) {
      setClauses.push(`username = $${paramIndex}`);
      values.push(data.username);
      paramIndex++;
    }

    if (setClauses.length === 0) return null;

    const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $1 RETURNING id, username, is_superuser, created_at`;
    const result = await this.pool.query<IUser>(query, values);

    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM users WHERE id=$1", [id]);

    return (result.rowCount ?? 0) > 0;
  }
}
