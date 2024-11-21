import Id from '@common/domain/value-object/vos/id.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import Status from '@user/domain/value-object/user-status.vo';

export interface IUserSchema {
  id: Id;
  uuid: UUID;
  status: Status;
}
