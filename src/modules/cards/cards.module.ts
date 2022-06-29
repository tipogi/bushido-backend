import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/utils/modules/ddbb/database.module';
import { ShowTopicsHandler } from './application/query/show-topics.handler';
import { TopicQueryResolver } from './infrastructure/adapters/in/graphql/queries/topic-query.resolver';

export const EventHandlers = [ShowTopicsHandler];

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [],
  providers: [TopicQueryResolver, ...EventHandlers],
})
export class CardsModule {}
