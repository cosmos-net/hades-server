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
} from 'class-validator';

import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { InputPaginationDto } from '@common/infrastructure/dtos/pagination-options/input-pagination.dto';

export const ORDER_BY_VALUES = [
  'name',
  'description',
  'createdAt',
  'updatedAt',
  'archivedAt',
] as const;

export type ListOrderByTypes = (typeof ORDER_BY_VALUES)[number];

export class ListRoleInputDto extends InputPaginationDto {
  @IsOptional()
  @IsIn(ORDER_BY_VALUES, {
    message: `The orderBy field must be one of the following values: ${ORDER_BY_VALUES.join(', ')}`,
  })
  public readonly orderBy?: ListOrderByTypes = ORDER_BY_VALUES[0];

  @IsOptional()
  @IsString()
  public readonly name?: string;

  @IsOptional()
  @IsString()
  public readonly description?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean()
  public readonly withArchived?: boolean = false;

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

    if (this.name) {
      const map: IKeysFilterMap = {
        field: 'name',
        value: this.name,
        operator: OperatorsEnum.LIKE,
      };

      filtersMapper.push(map);
    }

    if (this.description) {
      const map: IKeysFilterMap = {
        field: 'description',
        value: this.description,
        operator: OperatorsEnum.LIKE,
      };

      filtersMapper.push(map);
    }

    if (this.withArchived !== undefined) {
      const map: IKeysFilterMap = {
        field: 'archivedAt',
        value: this.withArchived,
        operator: OperatorsEnum.WI_DEL,
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
