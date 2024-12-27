import {
  Document,
  FindOptionsWhere,
  IsNull,
  Not,
  Between,
  Equal,
  Like,
  ILike,
  In,
  Raw,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  FindManyOptions,
  FindOptionsOrder,
} from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { Filter } from '@common/domain/criteria/filters/filter';
import { Filters } from '@common/domain/criteria/filters/filters';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { Order } from '@common/domain/criteria/orders/order';

type TransformerFunctionType<T, K> = (value: T) => K;

export class TypeormCriteriaConverter<T extends Document> {
  private readonly transformers: Map<
    OperatorsEnum,
    TransformerFunctionType<Filter, FindOptionsWhere<T>>
  >;

  constructor() {
    this.transformers = new Map<
      OperatorsEnum,
      TransformerFunctionType<Filter, FindOptionsWhere<T>>
    >([
      [OperatorsEnum.EQ, this.equalFilter.bind(this)],
      [OperatorsEnum.NE, this.notEqualFilter.bind(this)],
      [OperatorsEnum.GT, this.greaterThanFilter.bind(this)],
      [OperatorsEnum.GTE, this.greaterThanOrEqualFilter.bind(this)],
      [OperatorsEnum.LT, this.lessThanFilter.bind(this)],
      [OperatorsEnum.LTE, this.lessThanOrEqualFilter.bind(this)],
      [OperatorsEnum.IN, this.inFilter.bind(this)],
      [OperatorsEnum.NIN, this.notInFilter.bind(this)],
      [OperatorsEnum.LIKE, this.likeFilter.bind(this)],
      [OperatorsEnum.N_LIKE, this.notLikeFilter.bind(this)],
      [OperatorsEnum.ILIKE, this.ilikeFilter.bind(this)],
      [OperatorsEnum.N_ILIKE, this.notILikeFilter.bind(this)],
      [OperatorsEnum.S_WITH, this.startsWithFilter.bind(this)],
      [OperatorsEnum.E_WITH, this.endsWithFilter.bind(this)],
      [OperatorsEnum.BETWEEN, this.betweenFilter.bind(this)],
      [OperatorsEnum.IS_NULL, this.isNullFilter.bind(this)],
      [OperatorsEnum.IS_NOT_NULL, this.isNotNullFilter.bind(this)],
      [OperatorsEnum.IS_EMPTY, this.isEmptyFilter.bind(this)],
      [OperatorsEnum.IS_NOT_EMPTY, this.isNotEmptyFilter.bind(this)],
      [OperatorsEnum.IS_TRUE, this.isTrueFilter.bind(this)],
      [OperatorsEnum.IS_FALSE, this.isFalseFilter.bind(this)],
      [OperatorsEnum.WI_DEL, this.withDeletedFilter.bind(this)],
    ]);
  }

  public convert(criteria: Criteria): FindManyOptions<T> {
    const options: FindManyOptions<T> = {};

    options.skip = criteria.offset;
    options.take = criteria.limit;

    if (criteria.hasFilters()) {
      options.where = this.generateFilters(criteria.filters);
    }

    if (criteria.hasOrder()) {
      options.order = this.generateOrder(criteria.order);
    }

    if (criteria.hasWithArchived()) {
      options.withDeleted = true;
    }

    return options;
  }

  protected generateFilters(filters: Filters): FindOptionsWhere<T>[] {
    const filtersGenerated: FindOptionsWhere<T>[] = [];
    const listFilters = filters.getFilters();

    listFilters.forEach((filter) => {
      const operator = filter.getOperator();
      const transformer = this.transformers.get(operator);

      if (!transformer) {
        throw new Error(`Invalid operator: ${operator}`);
      }

      const transformerResult = transformer(filter);
      filtersGenerated.push(transformerResult);
    });

    return filtersGenerated;
  }

  protected generateOrder(order: Order): FindOptionsOrder<T> {
    const orderBy = order.getOrderBy() as keyof T;
    const orderType = order.getOrderType();

    return { [orderBy]: orderType } as FindOptionsOrder<T>;
  }

  private equalFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Equal(value) } as FindOptionsWhere<T>;
  }

  private notEqualFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Not(Equal(value)) } as FindOptionsWhere<T>;
  }

  private greaterThanFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: MoreThan(value) } as FindOptionsWhere<T>;
  }

  private greaterThanOrEqualFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: MoreThanOrEqual(value) } as FindOptionsWhere<T>;
  }

  private lessThanFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: LessThan(value) } as FindOptionsWhere<T>;
  }

  private lessThanOrEqualFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: LessThanOrEqual(value) } as FindOptionsWhere<T>;
  }

  private inFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: In(Array.isArray(value) ? value : [value]) } as FindOptionsWhere<T>;
  }

  private notInFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Not(In(Array.isArray(value) ? value : [value])) } as FindOptionsWhere<T>;
  }

  private likeFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Like(value) } as FindOptionsWhere<T>;
  }

  private notLikeFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Not(Like(value)) } as FindOptionsWhere<T>;
  }

  private ilikeFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: ILike(value) } as FindOptionsWhere<T>;
  }

  private notILikeFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Not(ILike(value)) } as FindOptionsWhere<T>;
  }

  private startsWithFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Like(`${value}%`) } as FindOptionsWhere<T>;
  }

  private endsWithFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    return { [field]: Like(`%${value}`) } as FindOptionsWhere<T>;
  }

  private betweenFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;
    const value = filter.getValue();

    if (!Array.isArray(value) || value.length !== 2) {
      throw new Error('Invalid between filter');
    }

    return { [field]: Between(value[0], value[1]) } as FindOptionsWhere<T>;
  }

  private isNullFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: IsNull() } as FindOptionsWhere<T>;
  }

  private isNotNullFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: Not(IsNull()) } as FindOptionsWhere<T>;
  }

  private isEmptyFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: Equal('') } as FindOptionsWhere<T>;
  }

  private isNotEmptyFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: Not(Equal('')) } as FindOptionsWhere<T>;
  }

  private isTrueFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: Equal(true) } as FindOptionsWhere<T>;
  }

  private isFalseFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: Equal(false) } as FindOptionsWhere<T>;
  }

  private withDeletedFilter(filter: Filter): FindOptionsWhere<T> {
    const field = filter.getField() as keyof T;

    return { [field]: Raw((alias) => `${alias} IS NOT NULL`) } as FindOptionsWhere<T>;
  }
}
