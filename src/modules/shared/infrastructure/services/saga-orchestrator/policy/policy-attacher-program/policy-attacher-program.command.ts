import { ICommand } from '@nestjs/cqrs';

export class PolicyAttacherProgramCommand implements ICommand {
  public readonly uuid: string;
  public readonly roleUUID: string;
  public readonly permissionUUID: string;
  public readonly description: string;

  constructor(props: PolicyAttacherProgramCommand) {
    this.uuid = props.uuid;
    this.roleUUID = props.roleUUID;
    this.permissionUUID = props.permissionUUID;
    this.description = props.description;
  }
}
