import { ICommand } from '@nestjs/cqrs';

export class UpdatePermissionCommand implements ICommand {
  public readonly uuid: string;

  public readonly description: string;

  constructor(props: UpdatePermissionCommand) {
    this.uuid = props.uuid;
    this.description = props.description;
  }
}
