import { NumberValueObject } from '@common/domain/value-object/types/number-value-object';

export default class SessionFailedAttempts extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  public static createAndIncrementOne(qtyFailedAttempts: number): SessionFailedAttempts {
    return new SessionFailedAttempts(qtyFailedAttempts + 1);
  }
}
