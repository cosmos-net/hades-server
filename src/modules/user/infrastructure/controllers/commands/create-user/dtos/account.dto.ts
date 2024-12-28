import { IsString, IsNotEmpty, Length, IsEmail, IsDefined } from 'class-validator';

import {
  MAX_ACCOUNT_USER_NAME_LENGTH,
  MIN_ACCOUNT_USER_NAME_LENGTH,
  MAX_ACCOUNT_PASSWORD_LENGTH,
  MIN_ACCOUNT_PASSWORD_LENGTH,
} from '@user/domain/constants/general-rules';

export class AccountDTO {
  @IsString()
  @IsNotEmpty()
  @Length(MIN_ACCOUNT_USER_NAME_LENGTH, MAX_ACCOUNT_USER_NAME_LENGTH)
  @IsDefined()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(MIN_ACCOUNT_PASSWORD_LENGTH, MAX_ACCOUNT_PASSWORD_LENGTH)
  @IsDefined()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(MIN_ACCOUNT_PASSWORD_LENGTH, MAX_ACCOUNT_PASSWORD_LENGTH)
  @IsDefined()
  public readonly passwordConfirmation: string;
}
