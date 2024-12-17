import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';

export class FilterOperator extends EnumValueObject<OperatorsEnum> {
  constructor(value: OperatorsEnum) {
    super(value, Object.values(OperatorsEnum));
  }

  public static create(value: string): FilterOperator {
    if (!Object.values(OperatorsEnum).includes(value as OperatorsEnum)) {
      // TODO: handle domain exception error
      throw new Error('Invalid operator');
    }

    return new FilterOperator(value as OperatorsEnum);
  }

  protected throwErrorForInvalidValue(value: OperatorsEnum): void {
    // TODO: handle domain exception error
    throw new Error(`Invalid operator: ${value}`);
  }

  public getValue(): OperatorsEnum {
    return this._value;
  }
}
