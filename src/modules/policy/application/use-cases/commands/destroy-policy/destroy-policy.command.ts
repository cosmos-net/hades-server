import { ICommand } from '@nestjs/cqrs';

export class DestroyPolicyCommand implements ICommand {
  public readonly uuid: string;

  constructor(DestroyPolicyCommand) {
    this.uuid = DestroyPolicyCommand.uuid;
  }
}
