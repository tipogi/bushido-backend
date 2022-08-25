import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { ErrorMessage } from './error';
import { VisitUpdatedEvent } from './events/visit-updated.event';

export interface DomainProperties {
  name: string;
  hash: string;
  visits: number;
}

// INFO: This is the domain layer which is the core layer in Domain-Driven design
// It was a concidence the our domain name it has same name as the layer name
// We could name it as 'Web' the domain but it does not describe better than domain.
// The domain name comes because that domain object describes a domain (https://bushido.guide) literally
export interface Domain {
  properties(): DomainProperties;
  updateVisits(hash: string): void;
  commit: () => void;
}

export class DomainImpl extends AggregateRoot implements Domain {
  private readonly name: string;
  private readonly hash: string;
  private visits: number;

  constructor(properties: DomainProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): DomainProperties {
    return {
      name: this.name,
      hash: this.hash,
      visits: this.visits,
    };
  }

  updateVisits(hash: string): void {
    if (this.hash !== hash) {
      throw new InternalServerErrorException(ErrorMessage.WRONG_HASH);
    }
    // Increment domain visit number
    this.visits++;
    this.apply(Object.assign(new VisitUpdatedEvent(), this));
  }
}
