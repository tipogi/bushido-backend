import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/utils/modules/ddbb/database.module';
import { InjectionToken } from './application/injection.token';
import { ShowTopicsHandler } from './application/query/show-topics.handler';
import { TopicQueryResolver } from './infrastructure/adapters/in/graphql/queries/topic-query.resolver';
import { TopicRepositoryImplement } from './infrastructure/adapters/out/repositories/topic.repository';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.TOPIC_REPOSITORY,
    useClass: TopicRepositoryImplement,
  },
];
const EventHandlers = [ShowTopicsHandler];

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [],
  providers: [TopicQueryResolver, ...infrastructure, ...EventHandlers],
})
export class CardsModule {}
