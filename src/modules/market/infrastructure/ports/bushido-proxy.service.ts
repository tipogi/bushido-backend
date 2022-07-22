import { ShowMarketOffersInput } from '../adapters/in/graphql/input';
import { MarketObject } from '../adapters/in/graphql/models';

export abstract class BushidoProxyService {
  requestOffers: (params: ShowMarketOffersInput) => Promise<MarketObject>;
}
