import { FilterField } from '@common/domain/criteria/filters/filter-field';
import { FilterOperator } from '@common/domain/criteria/filters/filter-operator';
import { FilterValue } from '@common/domain/criteria/filters/filter-value';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { Primitives } from '@common/domain/value-object/types/value-object';

export class Filter {
  public readonly field: FilterField;
  public readonly operator: FilterOperator;
  public readonly value: FilterValue<Primitives>;

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue<Primitives>) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  public static create<T extends Primitives>(values: Map<string, T>): Filter {
    // TODO: Refactor this method to use handler errors domain
    const field = values.get('field');
    const operator = values.get('operator');
    const value = values.get('value');

    if (!field) {
      throw new Error('Field is required');
    }

    if (!operator) {
      throw new Error('Operator is required');
    }

    if (!value) {
      throw new Error('Value is required');
    }

    const filterField = typeof field === 'string' && new FilterField(field);
    const filterOperator = typeof operator === 'string' && FilterOperator.create(operator);
    const filterValue = new FilterValue<T>(value);

    if (!filterField) {
      throw new Error('Field is invalid');
    }

    if (!filterOperator) {
      throw new Error('Operator is invalid');
    }

    return new Filter(filterField, filterOperator, filterValue);
  }

  public getValue(): Primitives {
    return this.value._value;
  }

  public getField(): string {
    return this.field._value;
  }

  public getOperator(): OperatorsEnum {
    return this.operator.getValue();
  }
}
