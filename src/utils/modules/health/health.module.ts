import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CONFIG_FILE_PATH } from 'src/utils/environment/constants';
import { EnvConfigModule } from 'src/utils/environment/env.config.module';
import { DatabaseModule } from '../ddbb/database.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    DatabaseModule,
    TerminusModule,
    HttpModule,
    EnvConfigModule.register({
      folder: CONFIG_FILE_PATH,
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
