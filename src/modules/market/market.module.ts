import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProxyModule } from '../proxy/proxy.module';
import { ShowMarketOffersHandler } from './application/query/show-market-offers.handler';
import { MarketQueryResolver } from './infrastructure/adapters/in/graphql/queries';

const EventHandlers = [ShowMarketOffersHandler];

@Module({
  imports: [CqrsModule, HttpModule, ProxyModule],
  controllers: [],
  providers: [MarketQueryResolver, ...EventHandlers],
})
export class MarketModule {}
