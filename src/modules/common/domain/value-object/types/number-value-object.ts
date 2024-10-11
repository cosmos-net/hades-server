import { ValueObject } from '@common/domain/value-object/types/value-object';

export abstract class NumberValueObject extends ValueObject<number> {
  readonly _value: number;

  isBiggerThan(other: NumberValueObject): boolean {
    return this._value > other._value;
  }
}
