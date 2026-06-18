import type { Pool } from "pg";
import type { IUser, UserResponse } from "../users/User.model.ts";
import type { CreateUserDTO } from "./Auth.model.ts";

export class AuthRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const result = await this.pool.query<IUser>(
      "SELECT id, username, password_hash, is_superuser, created_at, updated_at FROM users WHERE username = $1",
      [username],
    );

    return result.rows[0] || null;
  }

  async createUser(userData: CreateUserDTO): Promise<IUser> {
    const result = await this.pool.query<IUser>(
      "INSERT INTO users (username, password_hash, is_superuser) VALUES ($1, $2, $3) RETURNING *",
      [userData.username, userData.passwordHash, userData.isSuperuser ?? false],
    );

    return result.rows[0] as IUser;
  }

  async findById(id: string): Promise<UserResponse | null> {
    const result = await this.pool.query<UserResponse>(
      "SELECT id, username, is_superuser, created_at FROM users WHERE id=$1",
      [id],
    );
    return result.rows[0] || null;
  }
}
