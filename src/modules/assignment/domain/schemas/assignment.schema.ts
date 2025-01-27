import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Description from '@common/domain/value-object/vos/description.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import Title from '@common/domain/value-object/vos/name.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { RoleModel } from '@role/domain/models/role.model';
import { UserModel } from '@user/domain/models/user/user.model';

export interface IAssignmentSchema {
  id: Id;
  uuid: UUID;
  title: Title;
  description: Description | null;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt: ArchivedAt | null;
  user: UserModel;
  role: RoleModel;
}
