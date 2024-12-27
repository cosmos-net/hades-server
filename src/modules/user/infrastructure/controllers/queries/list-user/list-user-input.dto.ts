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
  IsEnum,
} from 'class-validator';

import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { IKeysFilterMap } from '@common/infrastructure/dtos/filter-map/keys-filter-map';
import { InputPaginationDto } from '@common/infrastructure/dtos/pagination-options/input-pagination.dto';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';
import { USER_OPTIONS_ORDER_BY_VALUE, USER_OPTIONS_ORDER_BY_VALUE_TYPE } from '@user/application/queries/use-cases/list-user/list-user.query';

export class ListUserInputDto extends InputPaginationDto {
  @IsOptional()
  @IsIn(USER_OPTIONS_ORDER_BY_VALUE, {
    message: `The orderBy field must be one of the following values: ${USER_OPTIONS_ORDER_BY_VALUE.join(', ')}`,
  })
  public readonly orderBy?: USER_OPTIONS_ORDER_BY_VALUE_TYPE = USER_OPTIONS_ORDER_BY_VALUE[0];

  // TODOl Add the correct type enum for the status field
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly status?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly secondLastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly phoneNumber?: string;

  @IsOptional()
  @IsEnum(ProfileGenderEnum)
  @IsNotEmpty()
  public readonly gender?: ProfileGenderEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly street?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly extNumber?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly intNumber?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly neighborhood?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly zipCode?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly country?: string;

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

    if (this.status) {
      const map: IKeysFilterMap = {
        field: 'status',
        value: this.status,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.username) {
      const map: IKeysFilterMap = {
        field: 'username',
        value: this.username,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.email) {
      const map: IKeysFilterMap = {
        field: 'email',
        value: this.email,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.name) {
      const map: IKeysFilterMap = {
        field: 'name',
        value: this.name,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.lastName) {
      const map: IKeysFilterMap = {
        field: 'lastName',
        value: this.lastName,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.secondLastName) {
      const map: IKeysFilterMap = {
        field: 'secondLastName',
        value: this.secondLastName,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.phoneNumber) {
      const map: IKeysFilterMap = {
        field: 'phoneNumber',
        value: this.phoneNumber,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.gender) {
      const map: IKeysFilterMap = {
        field: 'gender',
        value: this.gender,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.street) {
      const map: IKeysFilterMap = {
        field: 'street',
        value: this.street,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.extNumber) {
      const map: IKeysFilterMap = {
        field: 'extNumber',
        value: this.extNumber,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.intNumber) {
      const map: IKeysFilterMap = {
        field: 'intNumber',
        value: this.intNumber,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.neighborhood) {
      const map: IKeysFilterMap = {
        field: 'neighborhood',
        value: this.neighborhood,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.zipCode) {
      const map: IKeysFilterMap = {
        field: 'zipCode',
        value: this.zipCode,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.city) {
      const map: IKeysFilterMap = {
        field: 'city',
        value: this.city,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.state) {
      const map: IKeysFilterMap = {
        field: 'state',
        value: this.state,
        operator: OperatorsEnum.EQ,
      };

      filtersMapper.push(map);
    }

    if (this.country) {
      const map: IKeysFilterMap = {
        field: 'country',
        value: this.country,
        operator: OperatorsEnum.EQ,
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
