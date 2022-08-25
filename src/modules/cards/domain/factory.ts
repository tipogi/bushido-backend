import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Domain, DomainImpl, DomainProperties } from './domain';

export default class DomainFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
  ) {}

  create(properties: DomainProperties): Domain {
    return this.eventPublisher.mergeObjectContext(
      new DomainImpl(properties)
    )
  }
}
