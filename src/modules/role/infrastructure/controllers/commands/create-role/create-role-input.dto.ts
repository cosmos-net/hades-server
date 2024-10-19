import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import {
  MAX_ROLE_NAME_LENGTH,
  MIN_ROLE_NAME_LENGTH,
  MAX_ROLE_DESCRIPTION_LENGTH,
  MIN_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';

export class CreateRoleInput {
  @IsString()
  @IsNotEmpty()
  @Length(MAX_ROLE_NAME_LENGTH, MIN_ROLE_NAME_LENGTH)
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(MAX_ROLE_DESCRIPTION_LENGTH, MIN_ROLE_DESCRIPTION_LENGTH)
  public readonly description: string;
}
