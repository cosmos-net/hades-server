import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { ListSessionInputDto } from '@session/infrastructure/controllers/queries/list-session/list-session-input.dto';

export class ListSessionFilter {
  static toFilterMap(dto: ListSessionInputDto): Array<Map<string, PrimitivesType>> {
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

    addFilter(filtersMapper, 'sessionId', dto.sessionId, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'sessionType', dto.sessionType, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'sessionDuration', dto.sessionDuration, OperatorsEnum.GTE);
    addFilter(filtersMapper, 'sessionClosedType', dto.sessionClosedType, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'token', dto.token, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'ipAddress', dto.ipAddress, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'refreshToken', dto.refreshToken, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'userAgent', dto.userAgent, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'failedAttempts', dto.failedAttempts, OperatorsEnum.GTE);
    addFilter(filtersMapper, 'origin', dto.origin, OperatorsEnum.ILIKE);
    addFilter(filtersMapper, 'location', dto.location, OperatorsEnum.ILIKE);

    addFilter(filtersMapper, 'expiresInAt', dto.expiresInAt, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'loggedInAt', dto.loggedInAt, OperatorsEnum.EQ);
    addFilter(filtersMapper, 'loggedOutAt', dto.loggedOutAt, OperatorsEnum.EQ);

    addDateRangeFilter(filtersMapper, 'createdAt', dto.createdAtFrom, dto.createdAtTo);
    addDateRangeFilter(filtersMapper, 'updatedAt', dto.updatedAtFrom, dto.updatedAtTo);
    addDateRangeFilter(filtersMapper, 'archivedAt', dto.archivedAtFrom, dto.archivedAtTo);

    return filtersMapper.map(
      (filter): Map<string, PrimitivesType> => new Map(Object.entries(filter)),
    );
  }
}
