import { ValueObject } from '@common/domain/value-object/types/value-object';

export abstract class BooleanValueObject extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
    this.ensureIsBoolean();
  }

  private isValid(): boolean {
    return typeof this._value === 'boolean';
  }

  private ensureIsBoolean(): void {
    if (!this.isValid()) {
      throw new Error('The value must be a boolean');
    }
  }
}
