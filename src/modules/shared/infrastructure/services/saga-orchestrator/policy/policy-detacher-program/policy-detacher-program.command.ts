import { ICommand } from '@nestjs/cqrs';

export class PolicyDetacherProgramCommand implements ICommand {
  public readonly uuid: string;
  public readonly roleUUID: string;
  public readonly permissionUUID: string;

  constructor(props: PolicyDetacherProgramCommand) {
    this.uuid = props.uuid;
    this.roleUUID = props.roleUUID;
    this.permissionUUID = props.permissionUUID;
  }
}
