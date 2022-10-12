import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';
import { MarketObject } from '../../infrastructure/adapters/in/graphql/models';
import { BushidoProxyService } from '../../../proxy/infractructure/ports/bushido-proxy.service';
import { ProxyInjectionToken } from '../../../proxy/application/proxy-injection.token';
import { ShowMarketOffersQuery } from './show-market-offers.query';

const OFFERS_URL = 'market_offers';

@QueryHandler(ShowMarketOffersQuery)
export class ShowMarketOffersHandler implements IQueryHandler<ShowMarketOffersQuery> {
  constructor(@Inject(ProxyInjectionToken.BUSHIDO_PROXY_SERVICE) readonly bushidoProxyService: BushidoProxyService) {}

  async execute(query: ShowMarketOffersQuery): Promise<MarketObject> {
    try {
      const { offers, price } = await this.bushidoProxyService.requestOffers(query.params, OFFERS_URL);
      return {
        offers,
        price,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        // #ERROR_LOG
        console.log(e.code, e.message);
      }
      return {
        offers: [],
        price: '0',
      };
    }
  }
}
