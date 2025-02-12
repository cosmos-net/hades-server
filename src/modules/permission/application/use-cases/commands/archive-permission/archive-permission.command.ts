import { ICommand } from '@nestjs/cqrs';

export class ArchivePermissionCommand implements ICommand {
  public readonly uuid: string;

  constructor(props: ArchivePermissionCommand) {
    this.uuid = props.uuid;
  }
}
