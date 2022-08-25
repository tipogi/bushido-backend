import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VisitUpdatedEvent } from '../../domain/events/visit-updated.event';
import { IntegrationEventSubject } from './integration';

@EventsHandler(VisitUpdatedEvent)
export default class VisitUpdatedHandler implements IEventHandler<VisitUpdatedEvent> {
  constructor(private readonly logger: Logger) {}
  async handle(event: VisitUpdatedEvent): Promise<void> {
    this.logger.log(`${IntegrationEventSubject.VISIT_UPDATED}: ${JSON.stringify(event)}`);
  }
}
