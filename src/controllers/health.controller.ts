import { Controller, Dependencies, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

const { name, version } = require('../../package.json');

@Controller('health')
@Dependencies(HealthCheckService, HttpHealthIndicator)
export class HealthController {
  constructor() {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return { status: 'UP' };
  }

  @Get('version')
  @HealthCheck()
  healthCheckVersion() {
    return { name, version };
  }
}
