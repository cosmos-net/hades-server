import { PartialExcept } from '@helpers/types/partials.helper';
import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';

export interface IAccountBaseSchema {
  uuid: string;
  username: string;
  password: string;
  passwordConfirmation?: string;
  email: string;
}

export interface IAccountSchemaPrimitives extends IAccountBaseSchema {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  sessions?: ISessionSchemaPrimitives[];
}

export interface IListAccountSchemaPrimitive {
  total: number;
  items: IAccountSchemaPrimitives[];
}

export type DeepPartialExceptAccountBaseSchema = PartialExcept<IAccountBaseSchema, 'uuid'>[];
