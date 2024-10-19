import DescriptionValueObject from '@common/domain/value-object/vos/description.vo';
import regexCustomBuilderHelper from '@helpers/regex/regex-custom-builder.helper';
import {
  MAX_ROLE_DESCRIPTION_LENGTH,
  MIN_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';
import { RoleDescriptionException } from '@role/domain/exceptions/role-description.exception';

export default class Description extends DescriptionValueObject {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  private readonly _regex = regexCustomBuilderHelper({
    allowSpaces: true,
    allowNumbers: true,
    allowCaseInsensitive: true,
    minLength: MIN_ROLE_DESCRIPTION_LENGTH,
    maxLength: MAX_ROLE_DESCRIPTION_LENGTH,
    allowLetters: true,
    specialChars: '',
  });

  protected validate(): void {
    const isInValidValue = this._regex.test(this._value);

    if (isInValidValue) {
      throw new RoleDescriptionException(`Invalid value for role description: ${this._value}`);
    }
  }
}
