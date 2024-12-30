import { SelectQueryBuilder, Document } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { Filter } from '@common/domain/criteria/filters/filter';
import { Filters } from '@common/domain/criteria/filters/filters';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { Order } from '@common/domain/criteria/orders/order';

export class TypeormQueryBuilderCriteriaConverter<T extends Document> {
  constructor() {
    this.transformers = new Map<OperatorsEnum, (filter: Filter) => SelectQueryBuilder<T>>([
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

  private readonly transformers: Map<OperatorsEnum, (filter: Filter) => SelectQueryBuilder<T>>;
  private selectQueryBuilder: SelectQueryBuilder<T>;

  public convert(
    criteria: Criteria,
    selectQueryBuilderParam: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    this.selectQueryBuilder = selectQueryBuilderParam;
    this.createQueryBuilderBase(criteria);

    if (criteria.hasFilters()) {
      this.generateFilters(criteria.filters);
    }

    return this.selectQueryBuilder;
  }

  private generateFilters(filters: Filters): SelectQueryBuilder<T> {
    const listFilters = filters.getFilters();

    listFilters.forEach((filter): void => {
      const operator = filter.operator;
      const transformer = this.transformers.get(operator as unknown as OperatorsEnum);

      if (!transformer) {
        throw new Error(`Operator ${String(operator)} not supported`);
      }

      transformer(filter);
    });

    return this.selectQueryBuilder;
  }

  private createQueryBuilderBase(criteria: Criteria): SelectQueryBuilder<T> {
    this.selectQueryBuilder.skip(criteria.offset);
    this.selectQueryBuilder.take(criteria.limit);

    if (criteria.hasOrder()) {
      this.generateOrder(criteria.order);
    }

    if (criteria.hasWithArchived()) {
      this.selectQueryBuilder.withDeleted();
    }

    return this.selectQueryBuilder;
  }

  protected generateOrder(order: Order): SelectQueryBuilder<T> {
    const orderBy = order.getOrderBy();
    const orderType = order.getOrderType();

    let sort: 'ASC' | 'DESC';
    if (orderType === 'ASC') {
      sort = 'ASC';
    } else if (orderType === 'NONE') {
      sort = 'DESC';
    } else {
      sort = 'ASC';
    }

    this.selectQueryBuilder.orderBy(orderBy, sort);

    return this.selectQueryBuilder;
  }

  private equalFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} = :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private notEqualFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} != :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private greaterThanFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} > :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private greaterThanOrEqualFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} >= :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private lessThanFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} < :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private lessThanOrEqualFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} <= :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private inFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} IN (:...${filter.field})`, {
      [String(filter.field)]: filter.value,
    });
  }

  private notInFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} NOT IN (:...${filter.field})`, {
      [String(filter.field)]: filter.value,
    });
  }

  private likeFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} LIKE :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private notLikeFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} NOT LIKE :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private ilikeFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} ILIKE :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private notILikeFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} NOT ILIKE :${filter.field}`, {
      [String(filter.field)]: filter.value,
    });
  }

  private startsWithFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} LIKE :${filter.field}`, {
      [String(filter.field)]: `${filter.value}%`,
    });
  }

  private endsWithFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} LIKE :${filter.field}`, {
      [String(filter.field)]: `%${filter.value}`,
    });
  }

  private betweenFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(
      `${filter.field} BETWEEN :${filter.field}1 AND :${filter.field}2`,
      {
        [`${filter.field}1`]: filter.value[0],
        [`${filter.field}2`]: filter.value[1],
      },
    );
  }

  private isNullFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} IS NULL`);
  }

  private isNotNullFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} IS NOT NULL`);
  }

  private isEmptyFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} = ''`);
  }

  private isNotEmptyFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} != ''`);
  }

  private isTrueFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} = true`);
  }

  private isFalseFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field} = false`);
  }

  private withDeletedFilter(filter: Filter): SelectQueryBuilder<T> {
    return this.selectQueryBuilder.andWhere(`${filter.field}.deleted_at IS NOT NULL`);
  }
}
