import { ICommand } from '@nestjs/cqrs';

import { permissionCombinationType } from '@permission/domain/constants/permission-combination-type.constant';

export class CreatePermissionCommand implements ICommand {
  public readonly uuid: string;

  public readonly action: permissionCombinationType['action'];

  public readonly module: permissionCombinationType['module'];

  public readonly submodule?: permissionCombinationType['submodule'];

  public readonly description?: string;

  constructor(props: CreatePermissionCommand) {
    this.uuid = props.uuid;
    this.action = props.action;
    this.module = props.module;
    this.submodule = props.submodule;
    this.description = props.description;
  }
}
