export interface IPermissionBaseSchema {
  uuid: string;
  description: string | null;
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
  description?: string | null;
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

export interface IListPermissionSchemaPrimitives {
  total: number;
  items: IPermissionSchemaPrimitives[];
}
