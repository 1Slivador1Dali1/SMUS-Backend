import type { MetricService } from "./Metric.service.ts";

export class MetricController {
    private service: MetricService

    constructor(service: MetricService) {
        this.service = service
    }
}