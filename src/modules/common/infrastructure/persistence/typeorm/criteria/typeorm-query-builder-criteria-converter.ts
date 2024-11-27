import { SelectQueryBuilder } from 'typeorm';

import { Filter } from '@common/domain/criteria/filters/filter';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';

export class TypeORMCriteriaConverter<T> {
  private readonly queryBuilder: SelectQueryBuilder<T>;
  private readonly alias: string;

  constructor(queryBuilder: SelectQueryBuilder<T>, alias: string) {
    this.queryBuilder = queryBuilder;
    this.alias = alias;
  }

  private equalFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} = :${field}`, { [field]: value });
    return this;
  }

  private notEqualFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} != :${field}`, { [field]: value });
    return this;
  }

  private greaterThanFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} > :${field}`, { [field]: value });
    return this;
  }

  private greaterThanOrEqualFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} >= :${field}`, { [field]: value });
    return this;
  }

  private lessThanFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} < :${field}`, { [field]: value });
    return this;
  }

  private lessThanOrEqualFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} <= :${field}`, { [field]: value });
    return this;
  }

  private inFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} IN (:...${field})`, { [field]: value });
    return this;
  }

  private notInFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} NOT IN (:...${field})`, { [field]: value });
    return this;
  }

  private likeFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} LIKE :${field}`, { [field]: value });
    return this;
  }

  private notLikeFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} NOT LIKE :${field}`, { [field]: value });
    return this;
  }

  private ilikeFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} ILIKE :${field}`, { [field]: value });
    return this;
  }

  private notILikeFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} NOT ILIKE :${field}`, { [field]: value });
    return this;
  }

  private startsWithFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} LIKE :${field}`, { [field]: `${value}%` });
    return this;
  }

  private endsWithFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    this.queryBuilder.andWhere(`${this.alias}.${field} LIKE :${field}`, { [field]: `%${value}` });
    return this;
  }

  private betweenFilter(filter: Filter): this {
    const field = filter.getField();
    const value = filter.getValue();

    if (!Array.isArray(value) || value.length !== 2) {
      throw new Error('Invalid between filter');
    }

    const [from, to] = value;

    this.queryBuilder.andWhere(`${this.alias}.${field} BETWEEN :from AND :to`, { from, to });
    return this;
  }

  private isNullFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} IS NULL`);
    return this;
  }

  private isNotNullFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} IS NOT NULL`);
    return this;
  }

  private isEmptyFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} = ''`);
    return this;
  }

  private isNotEmptyFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} != ''`);
    return this;
  }

  private isTrueFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} = TRUE`);
    return this;
  }

  private isFalseFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} = FALSE`);
    return this;
  }

  private withDeletedFilter(filter: Filter): this {
    const field = filter.getField();

    this.queryBuilder.andWhere(`${this.alias}.${field} = TRUE`);
    return this;
  }

  public applyFilter(filter: Filter): this {
    switch (filter.getOperator()) {
      case OperatorsEnum.EQ:
        return this.equalFilter(filter);
      case OperatorsEnum.NE:
        return this.notEqualFilter(filter);
      case OperatorsEnum.GT:
        return this.greaterThanFilter(filter);
      case OperatorsEnum.GTE:
        return this.greaterThanOrEqualFilter(filter);
      case OperatorsEnum.LT:
        return this.lessThanFilter(filter);
      case OperatorsEnum.LTE:
        return this.lessThanOrEqualFilter(filter);
      case OperatorsEnum.IN:
        return this.inFilter(filter);
      case OperatorsEnum.NIN:
        return this.notInFilter(filter);
      case OperatorsEnum.LIKE:
        return this.likeFilter(filter);
      case OperatorsEnum.N_LIKE:
        return this.notLikeFilter(filter);
      case OperatorsEnum.ILIKE:
        return this.ilikeFilter(filter);
      case OperatorsEnum.N_ILIKE:
        return this.notILikeFilter(filter);
      case OperatorsEnum.S_WITH:
        return this.startsWithFilter(filter);
      case OperatorsEnum.E_WITH:
        return this.endsWithFilter(filter);
      case OperatorsEnum.BETWEEN:
        return this.betweenFilter(filter);
      case OperatorsEnum.IS_NULL:
        return this.isNullFilter(filter);
      case OperatorsEnum.IS_NOT_NULL:
        return this.isNotNullFilter(filter);
      case OperatorsEnum.IS_EMPTY:
        return this.isEmptyFilter(filter);
      case OperatorsEnum.IS_NOT_EMPTY:
        return this.isNotEmptyFilter(filter);
      case OperatorsEnum.IS_TRUE:
        return this.isTrueFilter(filter);
      case OperatorsEnum.IS_FALSE:
        return this.isFalseFilter(filter);
      case OperatorsEnum.WI_DEL:
        return this.withDeletedFilter(filter);
      default:
        throw new Error(`Unsupported filter operator: ${filter.getOperator()}`);
    }
  }
}
