import { NumberValueObject } from '@common/domain/value-object/types/number-value-object';

export default class SessionFailedAttempts extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  public static createAndIncrementOne(
    currentSessionFailedAttempts: SessionFailedAttempts,
  ): SessionFailedAttempts {
    return new SessionFailedAttempts(currentSessionFailedAttempts._value + 1);
  }
}
