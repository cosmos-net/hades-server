import { PermissionModel } from '@permission/domain/models/permission.model';
import { IPermissionSchemaPrimitives } from '@permission/domain/schemas/permission.schema-primitives';
import { RoleModel } from '@role/domain/models/role.model';
import { IRoleSchemaPrimitives } from '@role/domain/schemas/role.schema-primitives';

export interface IAttachPolicyParams {
  uuid: string;
  description?: string | null;
  roleUUID: string;
  permissionUUID: string;
}

export interface IDetachPolicyParams {
  roleUUID: string;
  permissionUUID: string;
}

export interface ICreatePolicyPrimitives {
  uuid: string;
  description?: string | null;
  role: RoleModel;
  permission: PermissionModel;
}

export interface IPoliciesBaseSchemaParams {
  uuid: string;
  roleUUID: string;
  permissionUUID: string;
}

export interface IPolicySchemaPrimitives {
  id?: number;
  uuid: string;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  role: IRoleSchemaPrimitives;
  permission: IPermissionSchemaPrimitives;
}

export interface IListPolicySchemaPrimitives {
  total: number;
  items: IPolicySchemaPrimitives[];
}
