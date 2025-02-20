import { PolicyModel } from '@policy/domain/models/policy.model';

export class CreatePolicyOutputDto {
  private readonly id: number;
  private readonly uuid: string;
  private readonly title: string;
  private readonly description: string;
  private readonly role: {
    uuid: string;
    name: string;
  };
  private readonly permissions: {
    uuid: string;
    title: string;
  }[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly archivedAt?: Date;

  constructor(public policy: PolicyModel) {
    this.id = policy.id;
    this.uuid = policy.uuid;
    this.title = policy.title;
    this.description = policy.description;
    this.role = {
      uuid: policy.role.uuid,
      name: policy.role.name,
    };
    this.permissions = policy.permissionList.getItems.map(
      (
        permission,
      ): {
        uuid: string;
        title: string;
      } => ({
        uuid: permission.uuid,
        title: permission.title,
      }),
    );
    this.createdAt = policy.createdAt;
    this.updatedAt = policy.updatedAt;
    this.archivedAt = policy.archivedAt;
  }
}
