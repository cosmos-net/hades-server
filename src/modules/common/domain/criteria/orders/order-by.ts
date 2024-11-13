import { StringValueObject } from '@common/domain/value-object/types/string-value-object';

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
