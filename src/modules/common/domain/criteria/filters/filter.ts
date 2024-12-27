import { FilterField } from '@common/domain/criteria/filters/filter-field';
import { FilterOperator } from '@common/domain/criteria/filters/filter-operator';
import { FilterValue } from '@common/domain/criteria/filters/filter-value';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { isNullish } from '@common/domain/rules/helper';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';

export class Filter {
  public readonly field: FilterField;
  public readonly operator: FilterOperator;
  public readonly value: FilterValue<PrimitivesType>;

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue<PrimitivesType>) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  public static create<T extends PrimitivesType>(values: Map<string, T>): Filter {
    // TODO: Refactor this method to use handler errors domain
    const field = values.get('field');
    const operator = values.get('operator');
    const value = values.get('value');

    if (isNullish(field)) {
      throw new Error('Field is required');
    }

    if (isNullish(operator)) {
      throw new Error('Operator is required');
    }

    if (isNullish(value)) {
      throw new Error('Value is required');
    }

    const filterField = typeof field === 'string' && new FilterField(field);
    const filterOperator = typeof operator === 'string' && FilterOperator.create(operator);
    const filterValue = new FilterValue<T>(value);

    if (isNullish(filterField)) {
      throw new Error('Field is invalid');
    }

    if (isNullish(filterOperator)) {
      throw new Error('Operator is invalid');
    }

    return new Filter(filterField, filterOperator, filterValue);
  }

  public getValue(): PrimitivesType {
    return this.value._value;
  }

  public getField(): string {
    return this.field._value;
  }

  public getOperator(): OperatorsEnum {
    return this.operator.getValue();
  }
}
