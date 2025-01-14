import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { SESSION } from '@session/domain/constants/general-rules';
export default class SessionIpAddress extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: true,
    allowCaseInsensitive: false,
    minLength: SESSION.IP_ADDRESS.MIN_LENGTH,
    maxLength: SESSION.IP_ADDRESS.MAX_LENGTH,
    allowLetters: true,
    specialChars: './',
  });

  private validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      //TODO: Handle domain error
      throw new Error('Invalid ip address');
    }
  }
}
