import { ICommand } from '@nestjs/cqrs';

export class DetachPolicyRoleCommand implements ICommand {
  public readonly roleUUID: string;
  public readonly policyUUID: string;

  constructor(props: DetachPolicyRoleCommand) {
    this.roleUUID = props.roleUUID;
    this.policyUUID = props.policyUUID;
  }
}
