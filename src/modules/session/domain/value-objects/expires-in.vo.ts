import { DateValueObject } from '@common/domain/value-object/types/date-value-object';

export default class ExpiresInAt extends DateValueObject {
  constructor(value: Date) {
    super(value);
  }
}
