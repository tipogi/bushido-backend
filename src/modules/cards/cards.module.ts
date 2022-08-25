import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/utils/modules/ddbb/database.module';
import { CardInjectionToken } from './application/card-injection.token';
import { UpdateVisitdHandler } from './application/command/update-visit.handler';
import VisitUpdatedHandler from './application/events/visit-updated.handler';
import { ShowDomainsHandler, ShowTopicsHandler } from './application/query';
import DomainFactory from './domain/factory';
import { DomainMutationResolver } from './infrastructure/adapters/in/graphql/mutation/domain-mutation.resolver';
import { DomainQueryResolver, TopicQueryResolver } from './infrastructure/adapters/in/graphql/queries';
import { DomainQueryImplement, TopicQueryImplement } from './infrastructure/adapters/out/query';
import DomainRepositoryImpl from './infrastructure/adapters/out/repository/domain.repository';

const infrastructure: Provider[] = [
  {
    provide: CardInjectionToken.TOPIC_QUERY,
    useClass: TopicQueryImplement,
  },
  {
    provide: CardInjectionToken.DOMAIN_QUERY,
    useClass: DomainQueryImplement,
  },
  {
    provide: CardInjectionToken.DOMAIN_REPOSITORY,
    useClass: DomainRepositoryImpl,
  },
];

const resolvers = [TopicQueryResolver, DomainQueryResolver, DomainMutationResolver];

const EventHandlers = [ShowTopicsHandler, ShowDomainsHandler, UpdateVisitdHandler, VisitUpdatedHandler];

const domain = [DomainFactory];

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [],
  providers: [Logger, ...resolvers, ...infrastructure, ...EventHandlers, ...domain],
})
export class CardsModule {}
