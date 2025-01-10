import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  IsNumber,
} from 'class-validator';

import { SESSION } from '@session/domain/constants/general-rules';

export class ActivateInvalidSessionInputDto {
  @IsUUID()
  @IsNotEmpty()
  public readonly uuid: string;

  @IsNumber()
  @Length(SESSION.SESSION_DURATION.MIN_LENGTH, SESSION.SESSION_DURATION.MAX_LENGTH)
  @IsNotEmpty()
  public readonly sessionDuration: number;

  @IsString()
  @Length(SESSION.TOKEN.MIN_LENGTH, SESSION.TOKEN.MAX_LENGTH)
  @IsNotEmpty()
  public readonly token: string;

  @IsDate()
  @IsNotEmpty()
  public readonly expiresInAt: Date;

  @IsOptional()
  @IsDate()
  public readonly loggedInAt: Date;

  @IsOptional()
  @IsString()
  @Length(SESSION.REFRESH_TOKEN.MIN_LENGTH, SESSION.REFRESH_TOKEN.MAX_LENGTH)
  public readonly refreshToken: string;
}
