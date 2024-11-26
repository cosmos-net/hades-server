import { StatusEnum } from '@common/domain/criteria/user-status-enum';
import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';

export class UserStatus extends EnumValueObject<StatusEnum> {
  constructor(value: StatusEnum) {
    super(value, Object.values(StatusEnum));
  }

  protected throwErrorForInvalidValue(value: StatusEnum): void {
    throw new Error(`Invalid status: ${value}`);
  }
}
