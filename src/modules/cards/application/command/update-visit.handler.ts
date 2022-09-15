import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/error';
import { DomainRepository } from '../../domain/repository';
import { CardInjectionToken } from '../card-injection.token';

import { UpdateVisitCommand } from './update-visit.command';

@CommandHandler(UpdateVisitCommand)
export class UpdateVisitdHandler implements ICommandHandler<UpdateVisitCommand, void> {
  constructor(
    @Inject(CardInjectionToken.DOMAIN_REPOSITORY)
    private readonly domainRepository: DomainRepository,
  ) {}

  async execute({ path, hash, name }: UpdateVisitCommand): Promise<void> {
    const domain = await this.domainRepository.findByPathAndName(path, name);
    if (!domain) {
      throw new NotFoundException(ErrorMessage.DOMAIN_IS_NOT_FOUND);
    }
    domain.updateVisits(hash);
    await this.domainRepository.updateVisits(domain);
    // Dispatch the events that domain create
    domain.commit();
  }
}