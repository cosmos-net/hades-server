import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/profile.dto';

export class CreateUserInput {
  @ValidateNested({ each: true })
  @Type(() => AccountDTO)
  public readonly account: AccountDTO[];

  @ValidateNested()
  @Type(() => ProfileDTO)
  public readonly profile: ProfileDTO;
}
