import { ICommand } from '@nestjs/cqrs';

export class AttachPolicyCommand implements ICommand {
  public readonly uuid: string;
  public readonly roleUUID: string;
  public readonly permissionUUID: string;
  public readonly description: string;

  constructor(props: AttachPolicyCommand) {
    this.uuid = props.uuid;
    this.roleUUID = props.roleUUID;
    this.permissionUUID = props.permissionUUID;
    this.description = props.description;
  }
}
