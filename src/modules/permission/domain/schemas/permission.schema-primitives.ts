export interface IPermissionBaseSchema {
  uuid: string;
  description?: string | null;
  action: {
    id: string;
    name: string;
  };
  module: {
    id: string;
    name: string;
  };
  submodule: {
    id: string;
    name: string;
  };
}

export interface IPermissionSchemaPrimitives {
  uuid: string;
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  action: {
    id: string;
    name: string;
  };
  module: {
    id: string;
    name: string;
  };
  submodule: {
    id: string;
    name: string;
  };
}

export interface IPermissionSchemaPrimitivesWithoutChildren
  extends Omit<IPermissionSchemaPrimitives, 'action' | 'module' | 'submodule'> {
  actionId: string;
  moduleId: string;
  submoduleId?: string | null;
}

export interface IListPermissionSchemaPrimitives {
  total: number;
  items: IPermissionSchemaPrimitives[];
}
