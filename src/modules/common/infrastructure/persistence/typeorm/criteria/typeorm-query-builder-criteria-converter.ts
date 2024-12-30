import { SelectQueryBuilder, Document } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { Filter } from '@common/domain/criteria/filters/filter';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';

export class TypeormQueryBuilderCriteriaConverter<T extends Document> {
  private readonly transformers: Map<
    OperatorsEnum,
    (queryBuilder: SelectQueryBuilder<T>, filter: Filter) => SelectQueryBuilder<T>
  >;

  constructor() {
    this.transformers = new Map<
      OperatorsEnum,
      (queryBuilder: SelectQueryBuilder<T>, filter: Filter) => SelectQueryBuilder<T>
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

  public convert(queryBuilder: SelectQueryBuilder<T>, criteria: Criteria): SelectQueryBuilder<T> {
    criteria.filters.getFilters().forEach((filter): void => {
      const transformer = this.transformers.get(filter.operator as unknown as OperatorsEnum);
      if (transformer) {
        transformer(queryBuilder, filter);
      }
    });

    const orderBy = criteria.order.getOrderBy();
    const orderType = criteria.order.getOrderType();

    let sortDirection: 'ASC' | 'DESC';
    if (orderType === 'ASC') {
      sortDirection = 'ASC';
    } else if (orderType === 'NONE') {
      sortDirection = 'DESC';
    } else {
      sortDirection = 'ASC';
    }

    const fieldWithAlias = this.getFieldWithAlias(queryBuilder, orderBy);
    if (fieldWithAlias) {
      queryBuilder.addOrderBy(fieldWithAlias, sortDirection);
    } else {
      queryBuilder.addOrderBy(orderBy, sortDirection);
    }

    return queryBuilder;
  }

  private getFieldWithAlias(queryBuilder: SelectQueryBuilder<T>, field: string): string | null {
    const alias = queryBuilder.alias || 'user';
    return `${alias}.${field}`;
  }

  private equalFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} = :${filter.field}`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private notEqualFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} != :${filter.field}`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private greaterThanFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} > :${filter.field}`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private greaterThanOrEqualFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} >= :${filter.field}`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private lessThanFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} < :${filter.field}`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private lessThanOrEqualFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} <= :${filter.field}`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private inFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} IN (:...${filter.field})`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private notInFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} NOT IN (:...${filter.field})`,
      {
        [String(filter.field)]: filter.value,
      },
    );
  }

  private likeFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} LIKE :${filter.field}`,
      {
        [String(filter.field)]: `%${filter.value}%`,
      },
    );
  }

  private notLikeFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} NOT LIKE :${filter.field}`,
      {
        [String(filter.field)]: `%${filter.value}%`,
      },
    );
  }

  private ilikeFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} ILIKE :${filter.field}`,
      {
        [String(filter.field)]: `%${filter.value}%`,
      },
    );
  }

  private notILikeFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} NOT ILIKE :${filter.field}`,
      {
        [String(filter.field)]: `%${filter.value}%`,
      },
    );
  }

  private startsWithFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} LIKE :${filter.field}`,
      {
        [String(filter.field)]: `${filter.value}%`,
      },
    );
  }

  private endsWithFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} LIKE :${filter.field}`,
      {
        [String(filter.field)]: `%${filter.value}`,
      },
    );
  }

  private betweenFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    const [from, to] = filter.value as unknown as [string, string];
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} BETWEEN :from AND :to`,
      { from, to },
    );
  }

  private isNullFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} IS NULL`,
    );
  }

  private isNotNullFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} IS NOT NULL`,
    );
  }

  private isEmptyFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} = '{}'`,
    );
  }

  private isNotEmptyFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} != '{}'`,
    );
  }

  private isTrueFilter(queryBuilder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} = TRUE`,
    );
  }

  private isFalseFilter(
    queryBuilder: SelectQueryBuilder<T>,
    filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.andWhere(
      `${this.getFieldWithAlias(queryBuilder, String(filter.field))} = FALSE`,
    );
  }

  private withDeletedFilter(
    queryBuilder: SelectQueryBuilder<T>,
    _filter: Filter,
  ): SelectQueryBuilder<T> {
    return queryBuilder.withDeleted();
  }
}
