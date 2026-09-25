import type { Pool } from "pg";

export class MetricRepository {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }
}