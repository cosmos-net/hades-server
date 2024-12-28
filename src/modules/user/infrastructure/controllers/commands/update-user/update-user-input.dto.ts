import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsUUID, ValidateIf, ValidateNested } from 'class-validator';

import { AccountDTO } from '@user/infrastructure/controllers/commands/update-user/dtos/account.dto';
import { ProfileDTO } from '@user/infrastructure/controllers/commands/update-user/dtos/profile.dto';

export class UpdateUserInput {
  @IsUUID()
  public readonly uuid: string;

  @ValidateIf(o => !o.profile)
  @IsNotEmpty({ message: 'If the profile is not defined, the account should be defined' })
  @IsArray()
  @ArrayNotEmpty({ message: 'The accounts array should not be empty' })
  @ArrayMinSize(1, { message: 'The accounts array should have at least one account' })
  @ValidateNested({ each: true, message: 'Each account should be a valid account' })
  @Type(() => AccountDTO)
  public readonly accounts?: AccountDTO[];

  @ValidateIf(o => !o.accounts)
  @IsNotEmpty({ message: 'If the account is not defined, the profile should be defined' })
  @IsNotEmptyObject({}, { message: 'The profile should be defined' })
  @ValidateNested()
  @Type(() => ProfileDTO)
  public readonly profile?: ProfileDTO;
}
