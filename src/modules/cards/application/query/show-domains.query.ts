import { IQuery } from '@nestjs/cqrs';

export class ShowDomainsQuery implements IQuery {
  constructor(readonly path: string[]) {}
}
