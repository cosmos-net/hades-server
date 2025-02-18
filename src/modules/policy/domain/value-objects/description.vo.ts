import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';
import { StringValueObject } from '@common/domain/value-object/types/string-value-object';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { POLICY_RULES } from '@policy/domain/constants/policy-rules.constant';

export default class Description extends StringValueObject {
  constructor(value) {
    super(value);
    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: true,
    allowNumbers: true,
    allowCaseInsensitive: false,
    minLength: POLICY_RULES.DESCRIPTION.MIN_LENGTH,
    maxLength: POLICY_RULES.DESCRIPTION.MAX_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  private validate(): void {
    const isValid = this._regex.test(this._value);

    if (!isValid) {
      throw new BusinessConflictDomainException(`Invalid description: ${this._value}`);
    }
  }
}
