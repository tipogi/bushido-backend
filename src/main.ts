import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APOLLO_CLIENT = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activate CORS when we want to reach from Vite
  if (!APOLLO_CLIENT) app.enableCors({ origin: `http://localhost:5173` });
  await app.listen(4000);
}
bootstrap();
