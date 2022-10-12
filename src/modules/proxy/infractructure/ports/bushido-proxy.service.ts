import { ShowMarketOffersInput } from '../../../market/infrastructure/adapters/in/graphql/input';
import { MarketObject } from '../../../market/infrastructure/adapters/in/graphql/models';
import { IDomainData } from '../../application/query';

export abstract class BushidoProxyService {
  requestOffers: (params: ShowMarketOffersInput, path: string) => Promise<MarketObject>;
  requestDomainState: (params: IDomainData, path: string) => Promise<string>;
}
