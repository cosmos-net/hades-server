import { Document, FindManyOptions } from 'typeorm';

import { Criteria } from '@common/domain/criteria/criteria';
import { TypeormCriteriaConverter } from '@common/infrastructure/persistence/typeorm/criteria/typeorm-criteria-converter';

export abstract class TypeormRepository<T extends Document> extends TypeormCriteriaConverter<T> {
  protected getQueryByCriteria(criteria: Criteria): FindManyOptions<T> {
    const query = this.convert(criteria);

    return query;
  }
}
