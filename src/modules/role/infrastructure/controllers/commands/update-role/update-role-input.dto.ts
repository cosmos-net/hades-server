import { IsNotEmpty, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

import {
  MAX_ROLE_NAME_LENGTH,
  MIN_ROLE_NAME_LENGTH,
  MAX_ROLE_DESCRIPTION_LENGTH,
  MIN_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';

export class UpdateRoleInputDto {
  @ValidateIf((object) => object.description !== undefined)
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Length(MAX_ROLE_NAME_LENGTH, MIN_ROLE_NAME_LENGTH)
  public readonly name: string;

  @ValidateIf((object) => object.name !== undefined)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(MAX_ROLE_DESCRIPTION_LENGTH, MIN_ROLE_DESCRIPTION_LENGTH)
  public readonly description: string;
}
