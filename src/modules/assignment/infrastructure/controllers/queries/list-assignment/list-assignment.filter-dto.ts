import { ListAssignmentInputDto } from '@assignment/infrastructure/controllers/queries/list-assignment/list-assignment-input.dto';
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';

export class ListAssignmentFilter {
  static toFilterMap(dto: ListAssignmentInputDto): Array<Map<string, PrimitivesType>> {
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
