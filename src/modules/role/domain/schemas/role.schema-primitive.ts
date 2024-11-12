export interface IRoleSchemaPrimitive {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
