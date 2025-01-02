import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class SessionStatus extends EnumValueObject<SessionStatusEnum> {
  constructor(value: SessionStatusEnum) {
    super(value, Object.values(SessionStatusEnum));
  }

  protected throwErrorForInvalidValue(value: SessionStatusEnum): void {
    throw new Error(`Invalid status: ${value}`);
  }
}
