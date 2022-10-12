import { IQuery } from '@nestjs/cqrs';
import { PingDomainDTO } from '../../infractructure/adapter/in/dto';

export class ShowDomainAvailabilityQuery implements IQuery {
  constructor(readonly params: PingDomainDTO) {}
}
