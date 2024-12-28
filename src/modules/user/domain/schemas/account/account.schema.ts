import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Email from '@common/domain/value-object/vos/email.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { ListSessionModel } from '@session/domain/models/session-list.model';
import Password from '@user/domain/value-objects/account/password.vo';
import Username from '@user/domain/value-objects/account/username.vo';

export interface IAccountSchema {
  id?: Id;
  uuid: UUID;
  username: Username;
  email: Email;
  password: Password;
  passwordConfirmation?: Password;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt: ArchivedAt;
  sessions?: ListSessionModel;
}
