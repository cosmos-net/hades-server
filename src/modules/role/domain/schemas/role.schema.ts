import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Description from '@common/domain/value-object/vos/description.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import Name from '@common/domain/value-object/vos/name.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';

export interface IRoleSchema {
  id?: Id;
  uuid: UUID;
  name: Name;
  description?: Description;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt: ArchivedAt;
}
