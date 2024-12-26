import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import {
  MAX_ACCOUNT_USER_NAME_LENGTH,
  MIN_ACCOUNT_USER_NAME_LENGTH,
} from '@user/domain/constants/general-rules';

export default class Username extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: true,
    allowNumbers: true,
    allowCaseInsensitive: false,
    minLength: MIN_ACCOUNT_USER_NAME_LENGTH,
    maxLength: MAX_ACCOUNT_USER_NAME_LENGTH,
    allowLetters: true,
    specialChars: '-.$@*',
  });

  protected validate(): void {
    const isInValidValue = this._regex.test(this._value);

    // TODO Username exception for invalid username
    if (isInValidValue) {
      throw new Error(`Invalid username: ${this._value}`);
    }
  }
}
