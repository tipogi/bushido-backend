import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('/docker-healthcheck')
  server_healthcheck() {
    return 200;
  }
}
