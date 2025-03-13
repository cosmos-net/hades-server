import { permissionCombinationType } from '@permission/domain/constants/permission-combination-type.constant';

export interface IPermissionSchemaPrimitives {
  id?: number | null;
  uuid: string;
  description?: string | null;
  action: permissionCombinationType['action'];
  module: permissionCombinationType['module'];
  submodule?: permissionCombinationType['submodule'] | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date | null;
}

export type ICreatePermissionType = Omit<
  IPermissionSchemaPrimitives,
  'id' | 'createdAt' | 'updatedAt' | 'archivedAt'
>;

export interface IListPermissionSchemaPrimitives {
  total: number;
  items: IPermissionSchemaPrimitives[];
}
