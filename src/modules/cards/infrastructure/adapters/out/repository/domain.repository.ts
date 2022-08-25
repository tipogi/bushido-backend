import { Inject, Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver';
import { Domain, DomainProperties } from 'src/modules/cards/domain/domain';
import DomainFactory from 'src/modules/cards/domain/factory';
import { DomainNode, DomainRepository } from 'src/modules/cards/domain/repository';
import { Neo4jService } from 'src/utils/tools/neo4j';
import { getDomain, UPDATE_VISITS } from './graph.queries';
import { createMatchClause } from './repository.helper';

@Injectable()
export default class DomainRepositoryImpl implements DomainRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    @Inject(DomainFactory) private readonly domainFactory: DomainFactory,
  ) {}

  async findByPathAndName(path: string[], name: string): Promise<Domain | undefined> {
    // Create the match clause from path and name
    const matchClause = createMatchClause(path, name);
    const cypherQuery = getDomain(matchClause);
    // Fetch the domain
    const domain = await this.neo4jService.read(cypherQuery);
    if (domain.records.length === 0) return undefined;
    const properties = this.nodeToModel(domain);
    // Create using factory the domain aggregate
    return this.domainFactory.create(properties);
  }

  async updateVisits(domain: Domain) {
    const properties = this.modelToNode(domain);
    await this.neo4jService.write(UPDATE_VISITS, properties);
    return 'updated visits';
  }

  private modelToNode(model: Domain): DomainNode {
    const properties = model.properties();
    return {
      ...properties,
    };
  }

  private nodeToModel(result: QueryResult, key = 'domain'): DomainProperties {
    const domainNode = result.records[0].get(key);
    const visits = domainNode.visits;
    return {
      ...domainNode,
      visits: visits !== null ? visits : 0,
    };
  }
}
