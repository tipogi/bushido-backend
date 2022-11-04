import { Module } from '@nestjs/common';
import { GraphqlWrapperModule } from './utils/tools/graphql/graphql-wrapper.module';
import { AppModules } from './modules';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';

@Module({
  imports: [
    GraphqlWrapperModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ...AppModules,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
