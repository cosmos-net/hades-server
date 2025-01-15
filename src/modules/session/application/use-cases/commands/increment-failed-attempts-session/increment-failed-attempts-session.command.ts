import { ICommand } from '@nestjs/cqrs';

export class IncrementFailedAttemptsSessionCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: IncrementFailedAttemptsSessionCommand) {
    this.uuid = root.uuid;
  }
}
