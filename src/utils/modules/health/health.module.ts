import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '../ddbb/database.module';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
