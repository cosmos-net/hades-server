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
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean()
  public readonly withArchived?: boolean = false;

  @ValidateIf((o): boolean => o.expiresIn !== undefined)
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly expiresInAt?: string;

  @ValidateIf((o): boolean => o.loggedInAt !== undefined)
  @IsDefined({ message: 'loggedInAt is required when loggedOutAt is present' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  public readonly loggedInAt?: string;

  @ValidateIf((o): boolean => o.loggedInAt !== undefined)
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
