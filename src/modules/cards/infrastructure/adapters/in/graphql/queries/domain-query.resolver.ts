import { QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShowDomainsQuery } from 'src/modules/cards/application/query';
import { ShowDomainsInput } from '../input';
import { DomainObject } from '../models';

@Resolver(() => DomainObject)
export class DomainQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [DomainObject])
  async showDomains(
    @Args('data')
    showDomainInput: ShowDomainsInput,
  ): Promise<DomainObject[]> {
    const query = new ShowDomainsQuery(showDomainInput.path);
    return this.queryBus.execute(query);
  }
}
