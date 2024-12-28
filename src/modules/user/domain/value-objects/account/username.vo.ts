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
    minLength: MIN_ACCOUNT_USER_NAME_LENGTH,
    maxLength: MAX_ACCOUNT_USER_NAME_LENGTH,
    allowCaseInsensitive: true,
    allowLetters: true,
    allowNumbers: true,
    allowSpaces: false,
    specialChars: '-.$@*',
  });

  protected validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      throw new Error(`Invalid username: ${this._value}`);
    }
  }
}
