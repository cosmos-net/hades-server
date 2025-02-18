import { ICommand } from '@nestjs/cqrs';

export type permissionCombinationType = Record<
  'action' | 'module' | 'submodule',
  { id: string; name: string }
>;

export class CreatePermissionCommand implements ICommand {
  public readonly uuid: string;

  public readonly action: permissionCombinationType['action'];

  public readonly module: permissionCombinationType['module'];

  public readonly submodule?: permissionCombinationType['submodule'];

  constructor(props: CreatePermissionCommand) {
    this.uuid = props.uuid;
    this.action = props.action;
    this.module = props.module;
    this.submodule = props.submodule;
  }
}
