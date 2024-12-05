import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export class Gender extends EnumValueObject<ProfileGenderEnum> {
  constructor(value: ProfileGenderEnum) {
    super(value, Object.values(ProfileGenderEnum));
  }

  protected throwErrorForInvalidValue(value: ProfileGenderEnum): void {
    //TODO: Handle domain error
    throw new Error(`Invalid status: ${value}`);
  }
}
