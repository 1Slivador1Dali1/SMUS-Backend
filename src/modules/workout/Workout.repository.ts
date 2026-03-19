import type { Pool } from "pg";

export class WorkoutRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
}
