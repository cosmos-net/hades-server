import NameValueObject from '@common/domain/value-object/vos/name.vo';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import { MAX_ROLE_NAME_LENGTH, MIN_ROLE_NAME_LENGTH } from '@role/domain/constants/general-rules';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';

export default class Name extends NameValueObject {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: false,
    allowNumbers: false,
    allowCaseInsensitive: true,
    minLength: MIN_ROLE_NAME_LENGTH,
    maxLength: MAX_ROLE_NAME_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  protected validate(): void {
    const isInValidValue = this._regex.test(this._value);

    if (isInValidValue) {
      throw new RoleNameException(`Invalid value for role name: ${this._value}`);
    }
  }
}
