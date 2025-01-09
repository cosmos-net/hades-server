import { ValueObject } from '@common/domain/value-object/types/value-object';

export abstract class DateValueObject extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
    this.ensureIsDate();
  }

  private isValid(): boolean {
    return this._value instanceof Date;
  }

  ensureIsDate(): boolean {
    if (!this.isValid()) {
      throw new Error('Invalid date');
    }

    return true;
  }
}
