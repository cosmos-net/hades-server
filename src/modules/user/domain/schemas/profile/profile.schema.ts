import { Address } from '@common/domain/value-object/vos/address.vo';
import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { Gender } from '@user/domain/value-objects/profile/gender.vo';
import { LastName } from '@user/domain/value-objects/profile/last-name.vo';
import { Name } from '@user/domain/value-objects/profile/name.vo';
import { PhoneNumber } from '@user/domain/value-objects/profile/phone-number.vo';
import { SecondLastName } from '@user/domain/value-objects/profile/second-last-name.vo';

export interface IProfileSchema {
  id?: Id;
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
