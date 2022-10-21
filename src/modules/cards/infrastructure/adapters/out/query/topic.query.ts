import { Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver';
import { Neo4jService } from 'src/utils/tools/neo4j';
import { Topic, TopicQuery } from '../../../ports/query';
import { createQueryPath } from './query.helpers';
import { getTopicsQuery, ROOT_TOPICS } from './graphQueries';

@Injectable()
export class TopicQueryImplement implements TopicQuery {
  constructor(private readonly neo4jService: Neo4jService) {}
  // Get the topics of the path
  async findTopicByPath(arrayPath: string[]): Promise<Topic[]> {
    const path = createQueryPath(arrayPath);
    const query = getTopicsQuery(path);
    const res = await this.neo4jService.read(query);
    return convertEntityToTopicsList(res);
  }

  async findRootTopics(): Promise<Topic[]> {
    const res = await this.neo4jService.read(ROOT_TOPICS);
    console.log(res);
    return convertEntityToTopicsList(res);
  }
}

const convertEntityToTopicsList = (result: QueryResult): Topic[] => {
  return result.records.length === 0
    ? []
    : result.records.map((topic) => {
        const topicObject: Topic = topic.get('topic');
        // Extract the type from not Root nodes
        if (topicObject.labels) {
          const filteredType = topicObject.labels.filter((type) => type !== 'Topic');
          const type = filteredType[0];
          delete topicObject.labels;
          return { ...topicObject, type };
        }
        return { ...topicObject };
      });
};
