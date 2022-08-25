import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/error';
import { Topic, TopicQuery } from '../../infrastructure/ports/query';
import { CardInjectionToken } from '../card-injection.token';
import { ShowTopicsQuery } from './show-topics.query';

@QueryHandler(ShowTopicsQuery)
export class ShowTopicsHandler implements IQueryHandler<ShowTopicsQuery> {
  constructor(@Inject(CardInjectionToken.TOPIC_QUERY) readonly topicQuery: TopicQuery) {}

  async execute(query: ShowTopicsQuery): Promise<Topic[]> {
    const res =
      query.path.length === 0
        ? await this.topicQuery.findRootTopics()
        : await this.topicQuery.findTopicByPath(query.path);
    if (!res) throw new NotFoundException(ErrorMessage.PATH_NOT_FOUND);
    return res;
  }
}
