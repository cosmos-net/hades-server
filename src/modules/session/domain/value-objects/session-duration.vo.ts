import { NumberValueObject } from '@common/domain/value-object/types/number-value-object';

export default class SessionDuration extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
