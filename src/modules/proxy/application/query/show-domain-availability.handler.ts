import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BushidoProxyService } from '../../infractructure/ports/bushido-proxy.service';
import { ProxyInjectionToken } from '../proxy-injection.token';
import { ShowDomainAvailabilityQuery } from './show-domain-availability.query';

const PING_DOMAIN_URI = 'ping-domain';

export interface IDomainData {
  domain: string;
}

@QueryHandler(ShowDomainAvailabilityQuery)
export class ShowDomainAvailabilityHandler implements IQueryHandler<ShowDomainAvailabilityQuery> {
  constructor(@Inject(ProxyInjectionToken.BUSHIDO_PROXY_SERVICE) readonly bushidoProxyService: BushidoProxyService) {}

  async execute(query: ShowDomainAvailabilityQuery): Promise<string> {
    return await this.bushidoProxyService.requestDomainState({ domain: query.params.domain }, PING_DOMAIN_URI);
  }
}
