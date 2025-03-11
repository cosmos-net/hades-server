import { PermissionModel } from '@permission/domain/models/permission.model';

export class UpdatePermissionOutputDto {
  private readonly id: number;
  private readonly uuid: string;
  private readonly path: string;
  private readonly description: string;
  private readonly action: object;
  private readonly module: object;
  private readonly submodule: object;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly archivedAt: Date;

  constructor(root: PermissionModel) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.path = root.path;
    this.description = root.description;
    this.action = root.action;
    this.module = root.module;
    this.submodule = root.submodule;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
    this.archivedAt = root.archivedAt;
  }
}
