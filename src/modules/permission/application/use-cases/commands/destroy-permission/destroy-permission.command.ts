import { ICommand } from '@nestjs/cqrs';

export class DestroyPermissionCommand implements ICommand {
  public readonly uuid: string;

  constructor(props: DestroyPermissionCommand) {
    this.uuid = props.uuid;
  }
}
