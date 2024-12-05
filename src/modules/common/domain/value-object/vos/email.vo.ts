import DomainNotAllowedDomainException from '@common/domain/exceptions/domain-not-allowed.exception';
import { StringValueObject } from '@common/domain/value-object/types/string-value-object';

export default class Email extends StringValueObject {
  constructor(value: string) {
    super(value);
  }

  public static create(value: string): Email {
    return new Email(value);
  }

  public assureIsValid(): void {
    if (!Email.isValid(this._value)) {
      throw new DomainNotAllowedDomainException(`The email ${this._value} is not valid`);
    }
  }

  public static isValid(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }
}
