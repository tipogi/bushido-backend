import { Module } from '@nestjs/common';
import { GraphqlWrapperModule } from './utils/graphql/graphql-wrapper.module';
import { AppModules } from './modules';

@Module({
  imports: [
    GraphqlWrapperModule,
    ...AppModules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
