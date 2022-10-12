import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ShowDomainAvailabilityQuery } from 'src/modules/proxy/application/query';
import { PingDomainDTO } from '../dto';

@Controller('api/tor-proxy')
export class ProxyController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/ping-domain')
  async forgotPassword(@Body() domainDto: PingDomainDTO) {
    const query = new ShowDomainAvailabilityQuery(domainDto);
    return this.queryBus.execute(query);
  }
}
