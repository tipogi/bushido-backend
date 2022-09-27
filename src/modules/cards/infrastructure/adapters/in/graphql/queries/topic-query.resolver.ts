import { QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShowTopicsQuery } from 'src/modules/cards/application/query';
import { ShowTopicsInput } from '../input';
import { TopicObject } from '../models';

@Resolver(() => TopicObject)
export class TopicQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [TopicObject])
  async showTopics(
    @Args('data')
    showTopicInput: ShowTopicsInput,
  ): Promise<TopicObject[]> {
    const query = new ShowTopicsQuery(showTopicInput.path);
    return this.queryBus.execute(query);
  }
}
