import { StringValueObject } from '@common/domain/value-object/types/string-value-object';

export default class Name extends StringValueObject {
  constructor(value: string, regex: RegExp = /^[a-zA-Z\s]{2,30}$/) {
    super(value);
    this.validate(value, regex);
  }

  private validate(value: string, regex: RegExp) {
    if (!regex.test(value)) {
      throw new Error(`The name <${value}> is invalid`);
    }
  }
}

// TODO: Entender el uso de validaciones y excepciones en los value objects