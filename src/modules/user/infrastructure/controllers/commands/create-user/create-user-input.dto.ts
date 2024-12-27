import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/profile.dto';

export class CreateUserInputDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountDTO)
  @IsDefined()
  public readonly accounts: AccountDTO[];

  @ValidateNested()
  @Type(() => ProfileDTO)
  @IsDefined()
  public readonly profile: ProfileDTO;
}