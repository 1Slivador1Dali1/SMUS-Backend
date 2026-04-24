import type { Pool } from "pg";

export class AuthRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
}
