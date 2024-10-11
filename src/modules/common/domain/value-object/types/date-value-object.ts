import { ValueObject } from '@common/domain/value-object/types/value-object';

export abstract class DateValueObject extends ValueObject<Date> {
  private readonly value: Date;

  constructor(value: Date) {
    super(value);
    this.ensureIsDate();
  }

  private isValid() {
    return this.value instanceof Date;
  }

  ensureIsDate(): boolean {
    if (!this.isValid()) {
      throw new Error('Invalid date');
    }

    return true;
  }
}
