import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';

import {
  SESSION
} from '@session/domain/constants/general-rules';

export class UpdateSessionInputDto {
  @IsUUID()
  @IsNotEmpty()
  public readonly uuid: string;

  @IsString()
  @IsOptional()
  @Length(SESSION.SESSION_CLOSED_TYPE.MIN_LENGTH, SESSION.SESSION_CLOSED_TYPE.MAX_LENGTH)
  public readonly sessionClosedType: string;

  @IsOptional()
  @IsDate()
  public readonly loggedOutAt: Date;

  @IsOptional()
  @IsString()
  @Length(SESSION.REFRESH_TOKEN.MIN_LENGTH, SESSION.REFRESH_TOKEN.MAX_LENGTH)
  public readonly refreshToken: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(SESSION.REFRESH_TOKEN.MIN_LENGTH, SESSION.REFRESH_TOKEN.MAX_LENGTH)
  public readonly failedAttempts: number;
}
