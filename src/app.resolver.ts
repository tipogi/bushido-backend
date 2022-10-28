import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('/healthcheck')
  server_healthcheck() {
    return 200;
  }
}
