import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { PermissionModel } from '@permission/domain/models/permission.model';
import Description from '@policy/domain/value-objects/description.vo';
import Title from '@policy/domain/value-objects/title.vo';
import { RoleModel } from '@role/domain/models/role.model';

export interface IPolicySchema {
  id?: Id;
  uuid: UUID;
  title: Title;
  description?: Description | null;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt?: ArchivedAt | null;
  role: RoleModel;
  permission: PermissionModel;
}

// export interface IPolicyPartialSchema {
//   id: Id;
//   uuid: UUID;
//   title: Title;
//   description: Description | null;
//   createdAt: CreatedAt;
//   updatedAt: UpdatedAt;
//   archivedAt: ArchivedAt | null;
//   role: RoleModel;
//   permission: PermissionModel;
// }

export interface IPolicyNewParams {
  uuid: UUID;
  description?: Description | null;
  role: RoleModel;
  permission: PermissionModel;
}

export interface IPolicyPersistParams {
  id: Id;
  uuid: UUID;
  title: Title;
  description?: Description | null;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt?: ArchivedAt | null;
  role: RoleModel;
  permission: PermissionModel;
}
