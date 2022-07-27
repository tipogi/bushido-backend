import { Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver';
import { Neo4jService } from 'src/utils/tools/neo4j';
import { Topic, TopicRepository } from '../../../ports/respositories/topic.repository';
import { createQueryPath } from './repository.helpers';
import { getTopicsQuery } from './queries';

@Injectable()
export class TopicRepositoryImplement implements TopicRepository {
  constructor(private readonly neo4jService: Neo4jService) {}
  async findTopicByPath(arrayPath: string[]): Promise<Topic[] | undefined> {
    const path = createQueryPath(arrayPath);
    const query = getTopicsQuery(path);
    const res = await this.neo4jService.read(query);
    return convertEntityToTopicsList(res);
  }
}

const convertEntityToTopicsList = (result: QueryResult): Topic[] => {
  return result.records.length === 0
    ? []
    : result.records.map((topic) => {
        const topicObject: Topic = topic.get('topic');
        return { ...topicObject };
      });
};
