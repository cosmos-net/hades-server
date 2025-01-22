import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsIn,
  IsString,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsDefined,
  ValidateIf,
  IsNumber,
} from 'class-validator';

import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { InputPaginationDto } from '@common/infrastructure/dtos/pagination-options/input-pagination.dto';

export const ORDER_BY_VALUES = [
  'sessionId',
  'sessionType',
  'sessionDuration',
  'sessionClosedType',
  'token',
  'expiresIn',
  'loggedInAt',
  'loggedOutAt',
  'ipAddress',
  'refreshToken',
  'userAgent',
  'failedAttempts',
  'origin',
  'location',
  'createdAt',
  'updatedAt',
  'archivedAt',
] as const;

export type ListOrderByTypes = (typeof ORDER_BY_VALUES)[number];

export class ListSessionInputDto extends InputPaginationDto {
  @IsOptional()
  @IsIn(ORDER_BY_VALUES, {
    message: `The orderBy field must be one of the following values: ${ORDER_BY_VALUES.join(', ')}`,
  })
  public readonly orderBy?: ListOrderByTypes = ORDER_BY_VALUES[0];

  @IsString()
  @IsOptional()
  public readonly sessionId?: string;

  @IsString()
  @IsOptional()
  public readonly sessionType?: string;

  @IsNumber()
  @IsOptional()
  public readonly sessionDuration?: number;

  @IsString()
  @IsOptional()
  public readonly sessionClosedType?: string;

  @IsString()
  @IsOptional()
  public readonly token?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean()
  public readonly withArchived?: boolean = false;

  @ValidateIf((o) => o.expiresIn !== undefined)
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly expiresIn?: string;

  @ValidateIf((o) => o.loggedInAt !== undefined)
  @IsDefined({ message: 'loggedInAt is required when loggedOutAt is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly loggedInAt?: string;

  @ValidateIf((o) => o.loggedInAt !== undefined)
  @IsDefined({ message: 'loggedOutAt is required when loggedInAt is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly loggedOutAt?: string;

  @IsString()
  @IsOptional()
  public readonly ipAddress?: string;

  @IsString()
  @IsOptional()
  public readonly refreshToken?: string;

  @IsString()
  @IsOptional()
  public readonly userAgent?: string;

  @IsNumber()
  @IsOptional()
  public readonly failedAttempts?: number;

  @IsString()
  @IsOptional()
  public readonly origin?: string;

  @IsString()
  @IsOptional()
  public readonly location?: string;

  @ValidateIf((o) => o.createdAtTo !== undefined)
  @IsDefined({ message: 'createdAtFrom is required when createdAtTo is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly createdAtFrom?: string;

  @ValidateIf((o) => o.createdAtFrom !== undefined)
  @IsDefined({ message: 'createdAtTo is required when createdAtFrom is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly createdAtTo?: string;

  @ValidateIf((o) => o.updatedAtTo !== undefined)
  @IsDefined({ message: 'updatedAtFrom is required when updatedAtTo is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly updatedAtFrom?: string;

  @ValidateIf((o) => o.updatedAtFrom !== undefined)
  @IsDefined({ message: 'updatedAtTo is required when updatedAtFrom is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly updatedAtTo?: string;

  @ValidateIf((o) => o.archivedAtTo !== undefined)
  @IsDefined({ message: 'deletedAtFrom is required when deletedAtTo is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly archivedAtFrom?: string;

  @ValidateIf((o) => o.archivedAtFrom !== undefined)
  @IsDefined({ message: 'archivedAtTo is required when archivedAtFrom is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly archivedAtTo?: string;

  public toFilterMap(): Array<Map<string, PrimitivesType>> {
    const filtersMapper: IKeysFilterMap[] = [];

    if (this.sessionId) {
      const map: IKeysFilterMap = {
        field: 'sessionId',
        value: this.sessionId,
        operator: OperatorsEnum.LIKE,
      };

      filtersMapper.push(map);
    }

    if (this.sessionType) {
      const map: IKeysFilterMap = {
        field: 'sessionType',
        value: this.sessionType,
        operator: OperatorsEnum.LIKE,
      };

      filtersMapper.push(map);
    }

    if (this.createdAtFrom && this.createdAtTo) {
      const mapCreatedAtFrom: IKeysFilterMap = {
        field: 'createdAt',
        value: this.createdAtFrom,
        operator: OperatorsEnum.GTE,
      };

      filtersMapper.push(mapCreatedAtFrom);

      const mapCreatedAtTo: IKeysFilterMap = {
        field: 'createdAt',
        value: this.createdAtTo,
        operator: OperatorsEnum.LTE,
      };

      filtersMapper.push(mapCreatedAtTo);
    }

    if (this.updatedAtFrom && this.updatedAtTo) {
      const mapUpdatedAtFrom: IKeysFilterMap = {
        field: 'updatedAt',
        value: this.updatedAtFrom,
        operator: OperatorsEnum.GTE,
      };

      filtersMapper.push(mapUpdatedAtFrom);

      const mapUpdatedAtTo: IKeysFilterMap = {
        field: 'updatedAt',
        value: this.updatedAtTo,
        operator: OperatorsEnum.LTE,
      };

      filtersMapper.push(mapUpdatedAtTo);
    }

    if (this.archivedAtFrom && this.archivedAtTo) {
      const mapArchivedAtFrom: IKeysFilterMap = {
        field: 'archivedAt',
        value: this.archivedAtFrom,
        operator: OperatorsEnum.GTE,
      };

      filtersMapper.push(mapArchivedAtFrom);

      const mapArchivedAtTo: IKeysFilterMap = {
        field: 'archivedAt',
        value: this.archivedAtTo,
        operator: OperatorsEnum.LTE,
      };

      filtersMapper.push(mapArchivedAtTo);
    }

    return filtersMapper.map((filter) => new Map(Object.entries(filter)));
  }
}
