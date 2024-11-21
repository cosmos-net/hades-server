import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/user/commands/update-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/user/commands/update-user/dtos/profile.dto';

export class UpdateUserInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => AccountDTO)
  public readonly account?: AccountDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDTO)
  public readonly profile?: ProfileDTO;
}
