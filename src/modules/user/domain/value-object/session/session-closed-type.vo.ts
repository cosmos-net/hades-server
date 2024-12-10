import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { SESSION } from '@user/domain/constants/general-rules';

export default class SessionClosedType extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: false,
    allowCaseInsensitive: true,
    minLength: SESSION.SESSION_CLOSED_TYPE.MIN_LENGTH,
    maxLength: SESSION.SESSION_CLOSED_TYPE.MAX_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  private validate() {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      //TODO: Handle domain error
      throw new Error('Invalid session closed type');
    }
  }
}
