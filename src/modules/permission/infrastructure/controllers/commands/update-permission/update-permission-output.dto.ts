import { PermissionModel } from '@permission/domain/models/permission.model';

export class UpdatePermissionOutputDto {
  public readonly uuid: string;
  public readonly description?: string;
  public readonly updatedAt: Date;

  constructor(root: PermissionModel) {
    this.uuid = root.uuid;
    this.description = root.description;
    this.updatedAt = root.updatedAt;
  }
}
