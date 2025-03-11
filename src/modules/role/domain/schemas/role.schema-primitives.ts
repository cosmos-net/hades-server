import { IPolicySchemaPrimitives } from '@policy/domain/schemas/policy.schema-primitives';

export interface IRoleSchemaPrimitives {
  id?: number;
  uuid: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  policies?: IPolicySchemaPrimitives[] | null;
}

export interface IListRoleSchemaPrimitive {
  total: number;
  items: IRoleSchemaPrimitives[];
}
