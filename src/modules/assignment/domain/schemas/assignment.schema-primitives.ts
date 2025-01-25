export interface IAssignmentSchemaPrimitives {
  id: number;
  uuid: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}

export interface IListAssignmentSchemaPrimitives {
  total: number;
  items: IAssignmentSchemaPrimitives[];
}
