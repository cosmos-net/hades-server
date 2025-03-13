import { ICommand } from '@nestjs/cqrs';

export class RedescribePolicyCommand implements ICommand {
  public readonly uuid: string;
  public readonly description: string;

  constructor(props: RedescribePolicyCommand) {
    this.uuid = props.uuid;
    this.description = props.description;
  }
}
