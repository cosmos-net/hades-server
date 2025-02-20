import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { RoleModel } from '@role/domain/models/role.model';
import { IRoleSchemaPrimitives } from '@role/domain/schemas/role.schema-primitives';

export interface IPolicyBaseSchemaParams {
  uuid: string;
  description?: string | null;
  roleUUID: string;
  permissionUUIDs: string[];
}

export interface IPolicyBaseSchema {
  uuid: string;
  description: string | null;
  permissionList: ListPermissionModel;
  role: RoleModel;
}

export interface IPolicySchemaPrimitives {
  uuid: string;
  id: number;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  role: IRoleSchemaPrimitives;
}

export interface IListPolicySchemaPrimitives {
  total: number;
  items: IPolicySchemaPrimitives[];
}
