import { PermissionModel } from '@permission/domain/models/permission.model';

export class GetPermissionOutputDto {
  public readonly id?: number;
  public readonly uuid: string;
  public readonly path: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly archivedAt?: Date;

  constructor(root: PermissionModel) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.path = root.path;
    this.description = root.description;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
    this.archivedAt = root.archivedAt;
  }
}
