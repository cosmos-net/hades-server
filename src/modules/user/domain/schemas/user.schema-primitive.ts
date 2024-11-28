import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import { StatusEnum } from '@user/domain/enums/user-status-enum';

export interface IUserSchemaPrimitive {
  id: number;
  uuid: string;
  status: StatusEnum;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt: ArchivedAt;
}
