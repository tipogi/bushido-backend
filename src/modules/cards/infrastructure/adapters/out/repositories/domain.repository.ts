import { Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver';
import { Neo4jService } from 'src/utils/tools/neo4j';
import { Domain, DomainRepository } from '../../../ports/respositories';
import { createQueryPath } from './repository.helpers';
import { getDomainsQuery } from './queries';

@Injectable()
export class DomainRepositoryImplement implements DomainRepository {
  constructor(private readonly neo4jService: Neo4jService) {}
  async findDomainsByPath(arrayPath: string[]): Promise<Domain[] | undefined> {
    const path = createQueryPath(arrayPath);
    console.log(path);
    const query = getDomainsQuery(path);
    const res = await this.neo4jService.read(query);
    return convertEntityToDomainsList(res);
  }
}

const convertEntityToDomainsList = (result: QueryResult): Domain[] => {
  return result.records.length === 0
    ? []
    : result.records.map((topic) => {
        const domainObject: Domain = topic.get('domain');
        return { ...domainObject };
      });
};
