import { IPermissionSchemaPrimitives } from '@permission/domain/schemas/permission.schema-primitives';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { IRoleSchemaPrimitives } from '@role/domain/schemas/role.schema-primitives';

export class UnarchivePolicyOutputDto {
  private readonly id: number;
  private readonly uuid: string;
  private readonly title: string;
  private readonly description: string;
  private readonly permission: IPermissionSchemaPrimitives;
  private readonly role: IRoleSchemaPrimitives;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly archivedAt: Date;

  constructor(root: PolicyModel) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.title = root.title;
    this.description = root.description;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
    this.archivedAt = root.archivedAt;

    this.permission = root.permission.toPrimitives();
    this.role = root.role.toPrimitives();
  }
}
