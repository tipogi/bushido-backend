import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Throttle } from '@nestjs/throttler';
import { PROXY_HOST, PROXY_PORT } from 'src/utils/environment/constants';
import { EnvConfigService } from 'src/utils/environment/env.config.service';
import { Neo4jService } from 'src/utils/tools/neo4j';
import { pingToDatabase } from 'src/utils/tools/neo4j/neo4j.utils';

@Controller('api/healthcheck')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly neo4JService: Neo4jService,
    private http: HttpHealthIndicator,
    private configService: EnvConfigService,
  ) {}

  @Throttle(3, 60)
  @Get()
  @HealthCheck()
  healthCheck() {
    const HOST = `${this.configService.get(PROXY_HOST)}:${this.configService.get(PROXY_PORT)}`;
    return this.health.check([
      async () => {
        return await this.http.pingCheck('bushido.market', `http://${HOST}/tor-healthcheck`);
      },
      async () => formatDatabasePingResult(await pingToDatabase(this.neo4JService.getDriver())),
    ]);
  }
}

const formatDatabasePingResult = (pingStatus: boolean): HealthIndicatorResult => {
  const healthCheck: HealthIndicatorResult = { neo4J: { status: 'up' } };
  if (!pingStatus) {
    healthCheck.neo4J.status = 'down';
    Object.assign(healthCheck.neo4J, { message: 'connect ECONNREFUSED 127.0.0.1:7687' });
    throw new HealthCheckError('down', healthCheck);
  }
  return healthCheck;
};
