import { Filter } from '@common/domain/criteria/filters/filter';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';

export class Filters {
  private readonly filters: Filter[];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  public static create(filters: Array<Map<string, PrimitivesType>>): Filters {
    return new Filters(filters.map(Filter.create));
  }

  public getFilters(): Filter[] {
    return this.filters;
  }

  public static none(): Filters {
    return new Filters([]);
  }

  public hasFilters(): boolean {
    return this.filters.length > 0;
  }
}
