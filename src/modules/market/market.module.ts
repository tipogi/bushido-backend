import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MarketInjectionToken } from './application/market-injection.token';
import { ShowMarketOffersHandler } from './application/query/show-market-offers.handler';
import { MarketQueryResolver } from './infrastructure/adapters/in/graphql/queries';
import { BushidoProxyServiceImplement } from './infrastructure/adapters/out/services/bushido-proxy.service';

const infrastructure: Provider[] = [
  {
    provide: MarketInjectionToken.BUSHIDO_PROXY_SERVICE,
    useClass: BushidoProxyServiceImplement,
  },
];

const EventHandlers = [ShowMarketOffersHandler];

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [],
  providers: [MarketQueryResolver, ...infrastructure, ...EventHandlers],
})
export class MarketModule {}
