import NameValueObject from '@common/domain/value-object/vos/name.vo';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import {
  MAX_PROFILE_SECOND_LAST_NAME_LENGTH,
  MIN_PROFILE_SECOND_LAST_NAME_LENGTH,
} from '@user/domain/constants/general-rules';

export class SecondLastName extends NameValueObject {
  constructor(value: string) {
    super(value);
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: false,
    allowCaseInsensitive: true,
    minLength: MIN_PROFILE_SECOND_LAST_NAME_LENGTH,
    maxLength: MAX_PROFILE_SECOND_LAST_NAME_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  private validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      throw new Error('Second last name is invalid');
    }
  }
}
