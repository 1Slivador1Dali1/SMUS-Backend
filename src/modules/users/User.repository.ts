import type { Pool } from "pg";
import type { CreateUserDto, IUser, IUsers } from "./User.model.ts";

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
      "SELECT id, username, is_superuser FROM users ORDER BY created_at DESC",
    );
    return {
      items: result.rows,
    };
  }
}
