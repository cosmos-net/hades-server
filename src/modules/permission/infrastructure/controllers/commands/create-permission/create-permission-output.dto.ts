import { permissionCombinationType } from '@permission/application/use-cases/commands/create-permission/create-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';

export class CreatePermissionOutputDto {
  private readonly uuid: string;
  private readonly action: permissionCombinationType['action'];
  private readonly module: permissionCombinationType['module'];
  private readonly submodule: permissionCombinationType['submodule'];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly archivedAt?: Date;

  constructor(public permission: PermissionModel) {
    this.uuid = permission.uuid;
    this.action = permission.action;
    this.module = permission.module;
    this.submodule = permission.submodule;
    this.createdAt = permission.createdAt;
    this.updatedAt = permission.updatedAt;
    this.archivedAt = permission.archivedAt;
  }
}
