import { IQuery } from '@nestjs/cqrs';

export class ShowTopicsQuery implements IQuery {
  constructor(readonly path: string[]) {}
}
