import { ConflictException } from '@nestjs/common';

export type Primitives = string | number | boolean | Date | string[] | number[] | boolean[];

export abstract class ValueObject<T extends Primitives> {
  readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    const isInvalidValue = value === null || value === undefined;

    if (isInvalidValue) {
      throw new ConflictException('Value must be defined');
    }
  }

  public equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other._value === this._value;
  }

  public toString(): string {
    return this._value.toString();
  }
}
