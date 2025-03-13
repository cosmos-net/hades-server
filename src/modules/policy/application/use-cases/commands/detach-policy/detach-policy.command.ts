import { ICommand } from '@nestjs/cqrs';

export class DetachPolicyCommand implements ICommand {
  public readonly roleUUID: string;
  public readonly permissionUUID: string;

  constructor(props: DetachPolicyCommand) {
    this.roleUUID = props.roleUUID;
    this.permissionUUID = props.permissionUUID;
  }
}
