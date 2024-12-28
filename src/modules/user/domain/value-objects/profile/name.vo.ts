import NameValueObject from '@common/domain/value-object/vos/name.vo';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import {
  MAX_PROFILE_NAME_LENGTH,
  MIN_PROFILE_NAME_LENGTH,
} from '@user/domain/constants/general-rules';

export class Name extends NameValueObject {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: false,
    allowCaseInsensitive: true,
    minLength: MIN_PROFILE_NAME_LENGTH,
    maxLength: MAX_PROFILE_NAME_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  private validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      //TODO: Handle domain error
      throw new Error(
        `The Name ${this._value} is not valid. It must have a length between ${MIN_PROFILE_NAME_LENGTH} and ${MAX_PROFILE_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    }
  }
}
