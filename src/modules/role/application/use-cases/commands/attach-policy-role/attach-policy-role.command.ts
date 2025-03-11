import { ICommand } from '@nestjs/cqrs';

export class AttachPolicyRoleCommand implements ICommand {
  public readonly roleUUID: string;
  public readonly policyUUID: string;

  constructor(root: AttachPolicyRoleCommand) {
    this.roleUUID = root.roleUUID;
    this.policyUUID = root.policyUUID;
  }
}
