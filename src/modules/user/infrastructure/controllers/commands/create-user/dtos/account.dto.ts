import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

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
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  //TODO: handler confirmation of password
  @IsString()
  @IsNotEmpty()
  @Length(MIN_ACCOUNT_PASSWORD_LENGTH, MAX_ACCOUNT_PASSWORD_LENGTH)
  public readonly password: string;
}
