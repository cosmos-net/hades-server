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

import { UserStatusEnum } from '@common/domain/enums/user-status-enum';
import { InputPaginationDto } from '@common/infrastructure/dtos/pagination-options/input-pagination.dto';
import {
  USER_OPTIONS_ORDER_BY_VALUE,
  USER_OPTIONS_ORDER_BY_VALUE_TYPE,
} from '@user/application/use-cases/queries/list-user/list-user.query';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export class ListUserInputDto extends InputPaginationDto {
  @IsOptional()
  @IsIn(USER_OPTIONS_ORDER_BY_VALUE, {
    message: `The orderBy field must be one of the following values: ${USER_OPTIONS_ORDER_BY_VALUE.join(', ')}`,
  })
  public readonly orderBy?: USER_OPTIONS_ORDER_BY_VALUE_TYPE = USER_OPTIONS_ORDER_BY_VALUE[0];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly status?: UserStatusEnum;

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
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean()
  public readonly withArchived?: boolean = false;

  @ValidateIf((o): boolean => o.createdAtTo !== undefined)
  @IsDefined({ message: 'createdAtFrom is required when createdAtTo is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly createdAtFrom?: string;

  @ValidateIf((o): boolean => o.createdAtFrom !== undefined)
  @IsDefined({ message: 'createdAtTo is required when createdAtFrom is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly createdAtTo?: string;

  @ValidateIf((o): boolean => o.updatedAtTo !== undefined)
  @IsDefined({ message: 'updatedAtFrom is required when updatedAtTo is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly updatedAtFrom?: string;

  @ValidateIf((o): boolean => o.updatedAtFrom !== undefined)
  @IsDefined({ message: 'updatedAtTo is required when updatedAtFrom is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly updatedAtTo?: string;

  @ValidateIf((o): boolean => o.archivedAtTo !== undefined)
  @IsDefined({ message: 'deletedAtFrom is required when deletedAtTo is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly archivedAtFrom?: string;

  @ValidateIf((o): boolean => o.archivedAtFrom !== undefined)
  @IsDefined({ message: 'archivedAtTo is required when archivedAtFrom is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly archivedAtTo?: string;
}
