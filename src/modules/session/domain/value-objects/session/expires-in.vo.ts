import { DateValueObject } from '@common/domain/value-object/types/date-value-object';

export default class ExpiresIn extends DateValueObject {
  constructor(value: Date) {
    super(value);
  }
}
