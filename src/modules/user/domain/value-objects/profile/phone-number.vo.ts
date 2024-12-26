import NameValueObject from '@common/domain/value-object/vos/name.vo';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import {
  MAX_PROFILE_PHONE_NUMBER_LENGTH,
  MIN_PROFILE_PHONE_NUMBER_LENGTH,
} from '@user/domain/constants/general-rules';

export class PhoneNumber extends NameValueObject {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: true,
    allowNumbers: true,
    allowCaseInsensitive: false,
    minLength: MIN_PROFILE_PHONE_NUMBER_LENGTH,
    maxLength: MAX_PROFILE_PHONE_NUMBER_LENGTH,
    allowLetters: false,
    specialChars: '-',
  });

  private validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      throw new Error(
        `The phone number ${this._value} is not valid, it must be between ${MIN_PROFILE_PHONE_NUMBER_LENGTH} and ${MAX_PROFILE_PHONE_NUMBER_LENGTH} characters and only contain numbers and hyphens.`,
      );
    }
  }
}
