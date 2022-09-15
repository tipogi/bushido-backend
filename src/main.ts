import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APOLLO_CLIENT, EXTERNAL_IP, EXTERNAL_NETWORK, EXTERNAL_PORT } from './config/external_connections';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activate CORS when we want to reach from Vite
  if (!APOLLO_CLIENT || EXTERNAL_NETWORK) {
    console.log(`CORS activated on http://${EXTERNAL_IP}:${EXTERNAL_PORT}`);
    app.enableCors();
  }
  await app.listen(4000);
}
bootstrap();
