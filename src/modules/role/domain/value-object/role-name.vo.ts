import NameValueObject from '@common/domain/value-object/vos/name.vo';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
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
    minLength: 3,
    maxLength: 100,
    allowLetters: true,
    specialChars: '',
  });

  protected validate(): void {
    const isInValidValue = this._regex.test(this._value);

    if (isInValidValue) {
      throw new RoleNameException(
        `Invalid value for role name: ${this._value}`,
      );
    }
  }
}
