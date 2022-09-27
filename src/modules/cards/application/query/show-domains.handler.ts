import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { isEmpty } from 'lodash';
import { Neo4jError } from 'neo4j-driver';
import { PATH_NOT_FOUND_ERROR } from '../../domain/error';
import { Domain, DomainQuery } from '../../infrastructure/ports/query';
import { CardInjectionToken } from '../card-injection.token';
import { ShowDomainsQuery } from './show-domains.query';

@QueryHandler(ShowDomainsQuery)
export class ShowDomainsHandler implements IQueryHandler<ShowDomainsQuery> {
  constructor(@Inject(CardInjectionToken.DOMAIN_QUERY) readonly domainQuery: DomainQuery) {}

  async execute(query: ShowDomainsQuery): Promise<Domain[]> {
    try {
      const res = await this.domainQuery.findDomainsByPath(query.path);
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
