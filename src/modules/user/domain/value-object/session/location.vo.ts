import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { SESSION } from '@user/domain/constants/general-rules';

export default class SessionLocation extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: true,
    allowNumbers: true,
    allowCaseInsensitive: true,
    minLength: SESSION.LOCATION.MIN_LENGTH,
    maxLength: SESSION.LOCATION.MAX_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  private validate() {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      //TODO: Handle domain error
      throw new Error('Invalid session location');
    }
  }
}
