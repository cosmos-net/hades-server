import { PrimitivesType, ValueObject } from '@common/domain/value-object/types/value-object';

export class FilterValue<T extends PrimitivesType> extends ValueObject<T> {
  constructor(value: T) {
    super(value);
  }
}
