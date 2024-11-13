import { Primitives, ValueObject } from '@common/domain/value-object/types/value-object';

export class FilterValue<T extends Primitives> extends ValueObject<T> {
  constructor(value: T) {
    super(value);
  }
}
