import { permissionCombinationType } from '@permission/application/use-cases/commands/create-permission/create-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';

export class CreatePermissionOutputDto {
  private readonly id: number;
  private readonly uuid: string;
  private readonly title: string;
  private readonly description: string;
  private readonly action: permissionCombinationType['action'];
  private readonly module: permissionCombinationType['module'];
  private readonly submodule: permissionCombinationType['submodule'];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly archivedAt?: Date;

  constructor(public permission: PermissionModel) {
    this.id = permission.id;
    this.uuid = permission.uuid;
    this.title = permission.title;
    this.description = permission.description;
    this.action = permission.action;
    this.module = permission.module;
    this.submodule = permission.submodule;
    this.createdAt = permission.createdAt;
    this.updatedAt = permission.updatedAt;
    this.archivedAt = permission.archivedAt;
  }
}
