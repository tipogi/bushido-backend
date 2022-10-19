import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { APOLLO_CLIENT, EXTERNAL_IP, EXTERNAL_NETWORK, EXTERNAL_PORT } from './config/external_connections';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Important to call before all the other app.use(...). This is due to the way the underlying platform
  // (i.e., Express or Fastify) works, where the order that middleware/routes are defined matters
  app.use(helmet());
  // Add that pipe to check the DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Activate CORS when we want to reach from Vite
  if (!APOLLO_CLIENT || EXTERNAL_NETWORK) {
    console.log(`CORS activated on http://${EXTERNAL_IP}:${EXTERNAL_PORT}`);
    app.enableCors();
  }
  await app.listen(4000);
}
bootstrap();
