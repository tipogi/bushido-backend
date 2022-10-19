import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Neo4jService } from 'src/utils/tools/neo4j';
import { pingToDatabase } from 'src/utils/tools/neo4j/neo4j.utils';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly neo4JService: Neo4jService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => {
        const res = await this.http.pingCheck('bushido.market', 'http://localhost:8080/healthcheck');
        console.log(res);
        return res;
      },
      async () => formatDatabasePingResult(await pingToDatabase(this.neo4JService.getDriver())),
    ]);
  }
}

const formatDatabasePingResult = (pingStatus: boolean): HealthIndicatorResult => {
  const healthCheck: HealthIndicatorResult = { neo4J: { status: 'up' } };
  if (pingStatus) {
    healthCheck.neo4J.status = 'down';
    Object.assign(healthCheck.neo4J, { message: 'connect ECONNREFUSED 127.0.0.1:7687' });
    throw new HealthCheckError('down', healthCheck);
  }
  return healthCheck;
};
