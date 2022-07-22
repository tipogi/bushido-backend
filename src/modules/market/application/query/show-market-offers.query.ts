import { IQuery } from '@nestjs/cqrs';
import { ShowMarketOffersInput } from '../../infrastructure/adapters/in/graphql/input';

export class ShowMarketOffersQuery implements IQuery {
  constructor(readonly params: ShowMarketOffersInput) {}
}
