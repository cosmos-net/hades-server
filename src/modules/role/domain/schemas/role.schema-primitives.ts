export interface IRoleSchemaPrimitives {
  id?: number;
  uuid: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}

export interface IListRoleSchemaPrimitive {
  total: number;
  items: IRoleSchemaPrimitives[];
}
