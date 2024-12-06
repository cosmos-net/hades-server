import { ISessionSchemaPrimitive } from '@user/domain/schemas/session/session.schema-primitive';

export interface IAccountSchemaPrimitives {
  id?: number;
  uuid: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  sessions?: ISessionSchemaPrimitive[];
}

export interface IListAccountSchemaPrimitive {
  total: number;
  items: IAccountSchemaPrimitives[];
}
