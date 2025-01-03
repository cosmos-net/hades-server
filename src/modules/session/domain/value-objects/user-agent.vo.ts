import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { SESSION } from '@session/domain/constants/general-rules';

export default class SessionUserAgent extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: true,
    allowNumbers: true,
    allowCaseInsensitive: true,
    minLength: SESSION.USER_AGENT.MIN_LENGTH,
    maxLength: SESSION.USER_AGENT.MAX_LENGTH,
    allowLetters: true,
    specialChars: '/()[]{};.,-_',
  });

  private validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      //TODO: Handle domain error
      throw new Error('Invalid user agent');
    }
  }
}
