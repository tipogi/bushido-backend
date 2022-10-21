import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { DOMAIN_WRONG_HASH_ERROR } from './error';
import { VisitUpdatedEvent } from './events/visit-updated.event';

export interface DomainProperties {
  name: string;
  hash: string;
  views: number;
}

// INFO: This is the domain layer which is the core layer in Domain-Driven design
// It was a concidence the our domain name it has same name as the layer name
// We could name it as 'Web' the domain but it does not describe better than domain.
// The domain name comes because that domain object describes a domain (https://bushido.guide) literally
export interface Domain {
  properties(): DomainProperties;
  updateViews(hash: string): void;
  commit: () => void;
}

export class DomainImpl extends AggregateRoot implements Domain {
  private readonly name: string;
  private readonly hash: string;
  private views: number;

  constructor(properties: DomainProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): DomainProperties {
    return {
      name: this.name,
      hash: this.hash,
      views: this.views,
    };
  }

  updateViews(hash: string): void {
    if (this.hash !== hash) {
      const { message, key } = DOMAIN_WRONG_HASH_ERROR;
      throw new InternalServerErrorException(message, key);
    }
    // Increment domain visit number
    this.views++;
    this.apply(Object.assign(new VisitUpdatedEvent(), this));
  }
}
