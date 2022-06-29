import { QueryBus } from '@nestjs/cqrs';
import { Resolver, Query } from '@nestjs/graphql';
import { ShowTopicsQuery } from 'src/modules/cards/application/query/show-topics.query';
import { TopicObject } from '../models';

@Resolver((of) => TopicObject)
export class TopicQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query((returns) => [TopicObject])
  async showTopics(): Promise<TopicObject[]> {
    const query = new ShowTopicsQuery(['s']);
    return this.queryBus.execute(query);
  }
}
