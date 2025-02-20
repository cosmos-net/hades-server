import { ICommand } from '@nestjs/cqrs';

export type PolicyCombinationType = Record<
  'action' | 'module' | 'submodule',
  { id: string; name: string }
>;

export class CreatePolicyCommand implements ICommand {
  public readonly uuid: string;

  public readonly description?: string | null = null;

  public readonly roleUUID: string;

  public readonly permissionUUIDs: string[];

  constructor(props: CreatePolicyCommand) {
    this.uuid = props.uuid;
    this.roleUUID = props.roleUUID;
    this.permissionUUIDs = props.permissionUUIDs;
  }
}
