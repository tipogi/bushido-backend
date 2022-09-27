import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { isEmpty } from 'lodash';
import { Neo4jError } from 'neo4j-driver';
import { PATH_NOT_FOUND_ERROR } from '../../domain/error';
import { Topic, TopicQuery } from '../../infrastructure/ports/query';
import { CardInjectionToken } from '../card-injection.token';
import { ShowTopicsQuery } from './show-topics.query';

@QueryHandler(ShowTopicsQuery)
export class ShowTopicsHandler implements IQueryHandler<ShowTopicsQuery> {
  constructor(@Inject(CardInjectionToken.TOPIC_QUERY) readonly topicQuery: TopicQuery) {}

  async execute(query: ShowTopicsQuery): Promise<Topic[]> {
    try {
      const res =
        query.path.length === 0
          ? await this.topicQuery.findRootTopics()
          : await this.topicQuery.findTopicByPath(query.path);
      if (isEmpty(res)) {
        const { message, key } = PATH_NOT_FOUND_ERROR;
        throw new NotFoundException(message, key);
      }
      return res;
    } catch (e) {
      if (e instanceof Neo4jError) {
        // #ERROR_LOG
        console.log(e.code);
        throw new InternalServerErrorException();
      }
      return e;
    }
  }
}
