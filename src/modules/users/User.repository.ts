import type { Pool } from "pg";
import type {
  CreateUserDto,
  IUser,
  IUsers,
  UserResponse,
} from "./User.model.ts";

export class UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(userData: CreateUserDto): Promise<IUser> {
    const result = await this.pool.query<IUser>(
      "INSERT INTO users (username, password_hash, is_superuser) VALUES ($1, $2, $3) RETURNING *",
      [userData.username, userData.password, userData.is_superuser ?? false],
    );

    return result.rows[0] as IUser;
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

  // #TODO: Update User

  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM users WHERE id=$1", [id]);

    return (result.rowCount ?? 0) > 0;
  }

  // #TODO: Metric User

  // #TODO: Weight History
}
