import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { IListPermissionParams } from '@permission/application/use-cases/queries/list-permission/list-permission.query';

export class ListPermissionFilterQuery {
  static toFilterMap(query: IListPermissionParams): Array<Map<string, PrimitivesType>> {
    const filtersMapper: IKeysFilterMap[] = [];

    const addFilter = (
      filtersMapper: IKeysFilterMap[],
      field: string,
      value: PrimitivesType | undefined,
      operator: OperatorsEnum,
    ): void => {
      if (value !== undefined) {
        filtersMapper.push({ field, value, operator });
      }
    };

    const addDateRangeFilter = (
      filtersMapper: IKeysFilterMap[],
      field: string,
      from: string | undefined,
      to: string | undefined,
    ): void => {
      if (from && to) {
        filtersMapper.push({ field, value: from, operator: OperatorsEnum.GTE });
        filtersMapper.push({ field, value: to, operator: OperatorsEnum.LTE });
      }
    };

    addFilter(filtersMapper, 'id', query.id, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'uuid', query.uuid, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'uuids', query.uuids, OperatorsEnum.IN);
    addFilter(filtersMapper, 'title', query.title, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'description', query.description, OperatorsEnum.ILIKE);

    addDateRangeFilter(filtersMapper, 'createdAt', query.createdAtFrom, query.createdAtTo);
    addDateRangeFilter(filtersMapper, 'updatedAt', query.updatedAtFrom, query.updatedAtTo);
    addDateRangeFilter(filtersMapper, 'archivedAt', query.archivedAtFrom, query.archivedAtTo);

    return filtersMapper.map(
      (filter): Map<string, PrimitivesType> => new Map(Object.entries(filter)),
    );
  }
}
