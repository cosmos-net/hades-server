import { RoleModel } from '@role/domain/models/role.model';
import { IRoleSchemaPrimitives } from '@role/domain/schemas/role.schema-primitives';
import { UserModel } from '@user/domain/models/user/user.model';
import { IUserSchemaPrimitives } from '@user/domain/schemas/user/user.schema-primitive';

export interface IAssignmentBaseSchema {
  uuid: string;
  description: string | null;
  user: UserModel;
  role: RoleModel;
}

export interface IAssignmentSchemaPrimitives {
  uuid: string;
  id: number;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  user: IUserSchemaPrimitives;
  role: IRoleSchemaPrimitives;
}

export interface IListAssignmentSchemaPrimitives {
  total: number;
  items: IAssignmentSchemaPrimitives[];
}
