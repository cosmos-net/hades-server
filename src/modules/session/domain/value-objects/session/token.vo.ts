import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { SESSION } from '@session/domain/constants/general-rules';

export default class SessionToken extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: true,
    allowCaseInsensitive: false,
    minLength: SESSION.TOKEN.MIN_LENGTH,
    maxLength: SESSION.TOKEN.MAX_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  private validate() {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      //TODO: Handle domain error
      throw new Error('Invalid session token');
    }
  }
}
