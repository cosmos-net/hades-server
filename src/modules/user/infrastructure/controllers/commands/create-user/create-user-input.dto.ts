import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDefined, IsOptional, ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/profile.dto';

export class CreateUserInputDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'The accounts array should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => AccountDTO)
  @IsDefined()
  public readonly accounts: AccountDTO[];

  @ValidateNested()
  @Type(() => ProfileDTO)
  // @IsDefined()
  @IsOptional()
  public readonly profile: ProfileDTO;
}