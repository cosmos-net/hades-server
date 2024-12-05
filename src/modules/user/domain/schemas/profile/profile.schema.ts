import { Address } from '@common/domain/value-object/vos/address.vo';
import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { Gender } from '@user/domain/value-object/profile/gender.vo';
import { LastName } from '@user/domain/value-object/profile/last-name.vo';
import { Name } from '@user/domain/value-object/profile/name.vo';
import { PhoneNumber } from '@user/domain/value-object/profile/phone-number.vo';
import { SecondLastName } from '@user/domain/value-object/profile/second-last-name.vo';

export interface IUserSchema {
  id: Id;
  uuid: UUID;
  names: Name[];
  lastName: LastName;
  secondLastName: SecondLastName;
  phoneNumber: PhoneNumber;
  gender: Gender;
  address: Address;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  archivedAt: ArchivedAt;
}
