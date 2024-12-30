// filters/user-filters.helper.ts
import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { ListUserInputDto } from '@user/infrastructure/controllers/queries/list-user/list-user-input.dto';

export class ListUserFilter {
  static toFilterMap(dto: ListUserInputDto): Array<Map<string, PrimitivesType>> {
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

    addFilter(filtersMapper, 'status', dto.status, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'username', dto.username, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'email', dto.email, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'name', dto.name, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'lastName', dto.lastName, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'secondLastName', dto.secondLastName, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'phoneNumber', dto.phoneNumber, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'gender', dto.gender, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'street', dto.street, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'extNumber', dto.extNumber, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'intNumber', dto.intNumber, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'neighborhood', dto.neighborhood, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'zipCode', dto.zipCode, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'city', dto.city, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'state', dto.state, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'country', dto.country, OperatorsEnum.EQ);

    addDateRangeFilter(filtersMapper, 'createdAt', dto.createdAtFrom, dto.createdAtTo);
    addDateRangeFilter(filtersMapper, 'updatedAt', dto.updatedAtFrom, dto.updatedAtTo);
    addDateRangeFilter(filtersMapper, 'archivedAt', dto.archivedAtFrom, dto.archivedAtTo);

    return filtersMapper.map(
      (filter): Map<string, PrimitivesType> => new Map(Object.entries(filter)),
    );
  }
}
