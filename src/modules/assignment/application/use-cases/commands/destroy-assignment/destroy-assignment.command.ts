import { ICommand } from '@nestjs/cqrs';

export class DestroyAssignmentCommand implements ICommand {
  public readonly uuid: string;

  constructor(DestroyAssignmentCommand) {
    this.uuid = DestroyAssignmentCommand.uuid;
  }
}
