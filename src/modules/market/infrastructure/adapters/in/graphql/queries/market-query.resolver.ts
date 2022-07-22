import { QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShowMarketOffersQuery } from 'src/modules/market/application/query';
import { ShowMarketOffersInput } from '../input';
import { MarketObject } from '../models';

@Resolver(() => MarketObject)
export class MarketQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => MarketObject)
  async showMarketOffers(
    @Args('data')
    marketInput: ShowMarketOffersInput,
  ): Promise<MarketObject> {
    console.log(marketInput);
    const query = new ShowMarketOffersQuery(marketInput);
    return this.queryBus.execute(query);
  }
}
