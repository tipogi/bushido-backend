import { IEvent } from '@nestjs/cqrs';
import { DomainProperties } from '../domain';

export class VisitUpdatedEvent implements IEvent, DomainProperties {
  readonly name: string;
  readonly hash: string;
  readonly visits: number;
}
