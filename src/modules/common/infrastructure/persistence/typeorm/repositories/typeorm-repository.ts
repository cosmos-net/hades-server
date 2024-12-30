import { FindManyOptions, SelectQueryBuilder } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormCriteriaConverter } from '@common/infrastructure/persistence/typeorm/criteria/typeorm-criteria-converter';
import { TypeormQueryBuilderCriteriaConverter } from '@common/infrastructure/persistence/typeorm/criteria/typeorm-query-builder-criteria-converter';

export abstract class TypeormRepository<T> {
  private readonly typeormCriteriaConverter = new TypeormCriteriaConverter<T>();
  private readonly typeormBuilderCriteriaConverter = new TypeormQueryBuilderCriteriaConverter<T>();

  protected getQueryByCriteria(criteria: Criteria): FindManyOptions<T> {
    const query = this.typeormCriteriaConverter.convert(criteria);

    return query;
  }

  protected getQueryBuilderByCriteria(
    criteria: Criteria,
    selectQueryBuilderParam: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    const selectQueryBuilded = this.typeormBuilderCriteriaConverter.convert(
      selectQueryBuilderParam,
      criteria,
    );

    return selectQueryBuilded;
  }
}
