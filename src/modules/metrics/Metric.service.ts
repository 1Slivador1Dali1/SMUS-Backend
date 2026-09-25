import type { MetricRepository } from "./Metric.repository.ts";

export class MetricService {
    private repository: MetricRepository

    constructor(repository: MetricRepository) {
        this.repository = repository
    }
}