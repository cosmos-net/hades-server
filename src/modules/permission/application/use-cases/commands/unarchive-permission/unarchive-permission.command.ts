import { ICommand } from '@nestjs/cqrs';

export class UnarchivePermissionCommand implements ICommand {
  public readonly uuid: string;

  constructor(props: UnarchivePermissionCommand) {
    this.uuid = props.uuid;
  }
}
