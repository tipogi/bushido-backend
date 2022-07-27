import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/error';
import { Domain, DomainRepository } from '../../infrastructure/ports/respositories';
import { CardInjectionToken } from '../card-injection.token';
import { ShowDomainsQuery } from './show-domains.query';

@QueryHandler(ShowDomainsQuery)
export class ShowDomainsHandler implements IQueryHandler<ShowDomainsQuery> {
  constructor(@Inject(CardInjectionToken.DOMAIN_REPOSITORY) readonly domainRepository: DomainRepository) {}

  async execute(query: ShowDomainsQuery): Promise<Domain[]> {
    const res = await this.domainRepository.findDomainsByPath(query.path);
    if (!res) throw new NotFoundException(ErrorMessage.PATH_NOT_FOUND);
    return res;
  }
}
