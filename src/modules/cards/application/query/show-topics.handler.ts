import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/error';
import { TopicRepository } from '../../infrastructure/ports/respositories/topic.repository';
import { CardInjectionToken } from '../card-injection.token';
import { ShowTopicsQuery } from './show-topics.query';

@QueryHandler(ShowTopicsQuery)
export class ShowTopicsHandler implements IQueryHandler<ShowTopicsQuery> {
  constructor(@Inject(CardInjectionToken.TOPIC_REPOSITORY) readonly topicRepository: TopicRepository) {}

  async execute(query: ShowTopicsQuery): Promise<any> {
    const res = await this.topicRepository.findTopicByPath(query.path);
    if (!res) throw new NotFoundException(ErrorMessage.PATH_NOT_FOUND);
    return res;
  }
}
