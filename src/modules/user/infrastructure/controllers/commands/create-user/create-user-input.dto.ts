import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDefined, ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/profile.dto';

export class CreateUserInputDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'The accounts array should not be empty' })
  @ArrayMinSize(1, { message: 'The accounts array should have at least one account' })
  @ValidateNested({ each: true, message: 'Each account should be a valid account' })
  @Type(() => AccountDTO)
  @IsDefined({ message: 'The accounts array should be defined' })
  public readonly accounts: AccountDTO[];

  @ValidateNested()
  @Type(() => ProfileDTO)
  @IsDefined({ message: 'The profile should be defined' })
  public readonly profile: ProfileDTO;
}