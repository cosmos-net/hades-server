import { IsNotEmpty, IsOptional, IsString, IsUUID, Length, ValidateIf } from 'class-validator';

import {
  MAX_ROLE_NAME_LENGTH,
  MIN_ROLE_NAME_LENGTH,
  MAX_ROLE_DESCRIPTION_LENGTH,
  MIN_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';

export class UpdateRoleInputDto {
  @IsUUID()
  @IsNotEmpty()
  public readonly uuid: string;

  @ValidateIf((object) => object.description !== undefined)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Length(MIN_ROLE_NAME_LENGTH, MAX_ROLE_NAME_LENGTH)
  public readonly name: string;

  @ValidateIf((object) => object.name !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(MIN_ROLE_DESCRIPTION_LENGTH, MAX_ROLE_DESCRIPTION_LENGTH)
  public readonly description: string;
}
