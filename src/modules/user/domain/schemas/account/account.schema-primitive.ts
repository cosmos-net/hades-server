import { PartialExcept } from '@helpers/types/partials.helper';
import { ISessionSchemaPrimitive } from '@user/domain/schemas/session/session.schema-primitive';

export interface IAccountBaseSchema {
  uuid: string;
  username: string;
  password: string;
  email: string;
}

export interface IAccountSchemaPrimitives extends IAccountBaseSchema {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  sessions?: ISessionSchemaPrimitive[];
}

export interface IListAccountSchemaPrimitive {
  total: number;
  items: IAccountSchemaPrimitives[];
}

export type DeepPartialExceptAccountBaseSchema = PartialExcept<IAccountBaseSchema, 'uuid'>[];
