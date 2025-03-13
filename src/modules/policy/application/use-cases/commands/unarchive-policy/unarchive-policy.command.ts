import { ICommand } from '@nestjs/cqrs';

export class UnarchivePolicyCommand implements ICommand {
  public readonly uuid: string;

  constructor(props: UnarchivePolicyCommand) {
    this.uuid = props.uuid;
  }
}
