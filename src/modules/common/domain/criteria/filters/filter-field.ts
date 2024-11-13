import { StringValueObject } from '@common/domain/value-object/types/string-value-object';

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
