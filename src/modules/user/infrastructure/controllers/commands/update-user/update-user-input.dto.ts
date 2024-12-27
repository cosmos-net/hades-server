import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/commands/update-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/commands/update-user/dtos/profile.dto';

export class UpdateUserInput {
  @IsUUID()
  public readonly uuid: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AccountDTO)
  public readonly account?: AccountDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDTO)
  public readonly profile?: ProfileDTO;
}
