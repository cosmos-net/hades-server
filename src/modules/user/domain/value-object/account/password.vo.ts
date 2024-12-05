import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import {
  MAX_ACCOUNT_PASSWORD_LENGTH,
  MIN_ACCOUNT_PASSWORD_LENGTH,
} from '@user/domain/constants/general-rules';

export default class Password extends StringValueObject {
  constructor(value: string) {
    super(value);
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: true,
    allowCaseInsensitive: false,
    minLength: MIN_ACCOUNT_PASSWORD_LENGTH,
    maxLength: MAX_ACCOUNT_PASSWORD_LENGTH,
    allowLetters: true,
    specialChars: '-.$@*',
  });
}
