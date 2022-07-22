import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MarketObject } from '../../infrastructure/adapters/in/graphql/models';
import { BushidoProxyService } from '../../infrastructure/ports/bushido-proxy.service';
import { MarketInjectionToken } from '../market-injection.token';
import { ShowMarketOffersQuery } from './show-market-offers.query';

@QueryHandler(ShowMarketOffersQuery)
export class ShowMarketOffersHandler implements IQueryHandler<ShowMarketOffersQuery> {
  constructor(@Inject(MarketInjectionToken.BUSHIDO_PROXY_SERVICE) readonly bushidoProxyService: BushidoProxyService) {}

  async execute(query: ShowMarketOffersQuery): Promise<MarketObject> {
    const { offers } = await this.bushidoProxyService.requestOffers(query.params);
    return {
      offers,
      price: '23158',
    };
  }
}
