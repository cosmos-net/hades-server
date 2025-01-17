import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';
import { SessionClosedTypeEnum } from '@session/domain/constants/session-closed-type.enum';

export default class SessionClosedType extends EnumValueObject<SessionClosedTypeEnum> {
  constructor(value: SessionClosedTypeEnum) {
    super(value, Object.values(SessionClosedTypeEnum));
  }

  protected throwErrorForInvalidValue(value: SessionClosedTypeEnum): void {
    throw new Error(`Invalid session closed type: ${value}`);
  }
}
