import { StatusEnum } from '@common/domain/criteria/user-status-enum';

export interface IUserSchemaPrimitive {
  id: number;
  uuid: string;
  status: StatusEnum;
}
