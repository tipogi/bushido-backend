import { ICommand } from '@nestjs/cqrs';

class Properties {
  readonly path: string[];
  readonly hash: string;
  readonly name: string;
}

export class UpdateVisitCommand extends Properties implements ICommand {
  constructor(properties: Properties) {
    super();
    Object.assign(this, properties);
  }
}
