import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProxyInjectionToken } from './application/proxy-injection.token';
import { ShowDomainAvailabilityHandler } from './application/query';
import { ProxyController } from './infractructure/adapter/in/rest/proxy.controller';
import { BushidoProxyServiceImplement } from './infractructure/adapter/out/services/bushido-proxy.service';

const infrastructure: Provider[] = [
  {
    provide: ProxyInjectionToken.BUSHIDO_PROXY_SERVICE,
    useClass: BushidoProxyServiceImplement,
  },
];

const EventHandlers = [ShowDomainAvailabilityHandler];

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [ProxyController],
  providers: [...infrastructure, ...EventHandlers],
  exports: [ProxyInjectionToken.BUSHIDO_PROXY_SERVICE],
})
export class ProxyModule {}


/*
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
*/