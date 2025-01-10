import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  IsNumber,
  Max,
  Min,
  IsISO8601,
} from 'class-validator';

import { SESSION } from '@session/domain/constants/general-rules';

export class ActivateInvalidSessionInputDto {
  @IsUUID()
  @IsNotEmpty()
  public readonly uuid: string;

  @IsNumber()
  @Min(SESSION.SESSION_DURATION.MIN_LENGTH)
  @Max(SESSION.SESSION_DURATION.MAX_LENGTH)
  @IsNotEmpty()
  public readonly sessionDuration: number;

  @IsString()
  @Length(SESSION.TOKEN.MIN_LENGTH, SESSION.TOKEN.MAX_LENGTH)
  @IsNotEmpty()
  public readonly token: string;

  @IsISO8601()
  // @Transform(({ value }) => {
  //   return new Date(value);
  // })
  @IsNotEmpty()
  public readonly expiresInAt: string;

  @IsISO8601()
  // @Transform(({ value }) => {
  //   return new Date(value);
  // })
  @IsNotEmpty()
  public readonly loggedInAt: string;

  @IsString()
  @Length(SESSION.REFRESH_TOKEN.MIN_LENGTH, SESSION.REFRESH_TOKEN.MAX_LENGTH)
  public readonly refreshToken: string;
}
