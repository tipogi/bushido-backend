import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateVisitCommand } from 'src/modules/cards/application/command/update-visit.command';
import { DomainVisitInput } from '../input';
import { DomainObject } from '../models';

@Resolver(() => DomainObject)
export class DomainMutationResolver {
  constructor(private readonly commandBus: CommandBus) {}
  @Mutation(() => String)
  async updateDomainVisit(@Args('data') domainVisitInput: DomainVisitInput) {
    const updateVisitCommand = new UpdateVisitCommand(domainVisitInput);
    await this.commandBus.execute(updateVisitCommand);
    return 'ok';
  }
}
