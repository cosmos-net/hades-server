import { UserStatusEnum } from '@common/domain/enums/user-status-enum';
import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';

export class UserStatus extends EnumValueObject<UserStatusEnum> {
  constructor(value: UserStatusEnum) {
    super(value, Object.values(UserStatusEnum));
  }

  protected throwErrorForInvalidValue(value: UserStatusEnum): void {
    throw new Error(`Invalid status: ${value}`);
  }
}
