import { Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver';
import { Neo4jService, Result } from 'src/utils/tools/neo4j';
import { Topic, TopicRepository } from '../../../ports/respositories/topic.repository';

@Injectable()
export class TopicRepositoryImplement implements TopicRepository {
  constructor(private readonly neo4jService: Neo4jService) {}
  async findTopicByPath(path: string[]): Promise<Topic[] | undefined> {
    const res = await this.neo4jService.read('MATCH (n:Root) RETURN n');
    return convertAccountListFromEntity(res);
  }
}

const convertAccountListFromEntity = (result: QueryResult): Topic[] | undefined => {
  return result.records.length === 0
    ? undefined
    : result.records.map((topic) => {
        const node = topic.get('n');
        const props = <Topic>node.properties;
        return { ...props };
      });
};
