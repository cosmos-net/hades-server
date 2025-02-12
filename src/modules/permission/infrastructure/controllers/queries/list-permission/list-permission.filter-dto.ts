import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { ListPermissionInputDto } from '@permission/infrastructure/controllers/queries/list-permission/list-permission-input.dto';

export class ListPermissionFilter {
  static toFilterMap(dto: ListPermissionInputDto): Array<Map<string, PrimitivesType>> {
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

    addFilter(filtersMapper, 'id', dto.id, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'uuid', dto.uuid, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'title', dto.title, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'description', dto.description, OperatorsEnum.ILIKE);

    addDateRangeFilter(filtersMapper, 'createdAt', dto.createdAtFrom, dto.createdAtTo);
    addDateRangeFilter(filtersMapper, 'updatedAt', dto.updatedAtFrom, dto.updatedAtTo);
    addDateRangeFilter(filtersMapper, 'archivedAt', dto.archivedAtFrom, dto.archivedAtTo);

    return filtersMapper.map(
      (filter): Map<string, PrimitivesType> => new Map(Object.entries(filter)),
    );
  }
}
