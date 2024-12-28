import { StatusEnum } from '@user/domain/enums/user-status-enum';

export interface IUserBaseSchema {
  uuid: string;
  status: StatusEnum;
}

export interface IUserSchemaPrimitives {
  id: number;
  uuid: string;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}

export interface IListUserSchemaPrimitive {
  total: number;
  items: IUserSchemaPrimitives[];
}
