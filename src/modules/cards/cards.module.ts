import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/utils/modules/ddbb/database.module';
import { CardInjectionToken } from './application/card-injection.token';
import { ShowDomainsHandler, ShowTopicsHandler } from './application/query';
import { DomainQueryResolver, TopicQueryResolver } from './infrastructure/adapters/in/graphql/queries';
import { DomainRepositoryImplement, TopicRepositoryImplement } from './infrastructure/adapters/out/repositories';

const infrastructure: Provider[] = [
  {
    provide: CardInjectionToken.TOPIC_REPOSITORY,
    useClass: TopicRepositoryImplement,
  },
  {
    provide: CardInjectionToken.DOMAIN_REPOSITORY,
    useClass: DomainRepositoryImplement,
  },
];

const resolvers = [TopicQueryResolver, DomainQueryResolver];

const EventHandlers = [ShowTopicsHandler, ShowDomainsHandler];

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [],
  providers: [...resolvers, ...infrastructure, ...EventHandlers],
})
export class CardsModule {}
