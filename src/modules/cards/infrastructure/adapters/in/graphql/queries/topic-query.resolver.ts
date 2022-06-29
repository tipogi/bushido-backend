import { QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShowTopicsQuery } from 'src/modules/cards/application/query/show-topics.query';
import { ShowTopicsInput } from '../input';
import { TopicObject } from '../models';

@Resolver((of) => TopicObject)
export class TopicQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query((returns) => [TopicObject])
  async showTopics(
    @Args('data')
    showTopicInput: ShowTopicsInput,
  ): Promise<TopicObject[]> {
    console.log(showTopicInput);
    const query = new ShowTopicsQuery(showTopicInput.path);
    return this.queryBus.execute(query);
  }
}
