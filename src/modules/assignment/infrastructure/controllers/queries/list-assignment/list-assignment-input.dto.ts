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

import { InputPaginationDto } from '@common/infrastructure/dtos/pagination-options/input-pagination.dto';

export const ORDER_BY_VALUES = [
  'uuid',
  'title',
  'description',
  'createdAt',
  'updatedAt',
  'archivedAt',
];

export type ListOrderByTypes = (typeof ORDER_BY_VALUES)[number];

export class ListAssignmentInputDto extends InputPaginationDto {
  @IsOptional()
  @IsIn(ORDER_BY_VALUES, {
    message: `The orderBy field must be one of the following values: ${ORDER_BY_VALUES.join(', ')}`,
  })
  public readonly orderBy?: ListOrderByTypes = ORDER_BY_VALUES[0];

  @IsOptional()
  @IsString()
  public readonly title?: string;

  @IsOptional()
  @IsString()
  public readonly description?: string;

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
