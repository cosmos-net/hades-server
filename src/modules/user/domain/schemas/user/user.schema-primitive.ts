import { UserStatusEnum } from '@common/domain/enums/user-status-enum';

export interface IUserBaseSchema {
  uuid: string;
  status: UserStatusEnum;
}

export interface IUserSchemaPrimitives {
  id: number;
  uuid: string;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}

export interface IListUserSchemaPrimitive {
  total: number;
  items: IUserSchemaPrimitives[];
}
