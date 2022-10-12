import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProxyInjectionToken } from '../proxy/application/proxy-injection.token';
import { ProxyModule } from '../proxy/proxy.module';
import { ShowMarketOffersHandler } from './application/query/show-market-offers.handler';
import { MarketQueryResolver } from './infrastructure/adapters/in/graphql/queries';

/*const infrastructure: Provider[] = [
  {
    provide: ProxyInjectionToken.BUSHIDO_PROXY_SERVICE,
    useClass: BushidoProxyServiceImplement,
  },
];*/

const EventHandlers = [ShowMarketOffersHandler];

@Module({
  imports: [CqrsModule, HttpModule, ProxyModule],
  controllers: [],
  providers: [MarketQueryResolver, ...EventHandlers],
})
export class MarketModule {}
