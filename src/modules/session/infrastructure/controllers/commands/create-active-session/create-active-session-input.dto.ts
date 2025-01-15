import { IsString, IsNotEmpty, IsNumber, Length, IsUUID } from 'class-validator';

import { SESSION } from '@session/domain/constants/general-rules';

export class CreateActiveSessionInput {
  @IsString()
  @IsNotEmpty()
  @Length(SESSION.SESSION_ID.MIN_LENGTH, SESSION.SESSION_ID.MAX_LENGTH)
  public readonly sessionId: string;

  @IsString()
  @IsNotEmpty()
  @Length(SESSION.SESSION_TYPE.MIN_LENGTH, SESSION.SESSION_TYPE.MAX_LENGTH)
  public readonly sessionType: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly sessionDuration: number;

  @IsString()
  @IsNotEmpty()
  public readonly token: string;

  @IsString()
  @IsNotEmpty()
  @Length(SESSION.IP_ADDRESS.MIN_LENGTH, SESSION.IP_ADDRESS.MAX_LENGTH)
  public readonly ipAddress: string;

  @IsString()
  @IsNotEmpty()
  public readonly refreshToken: string;

  @IsString()
  @IsNotEmpty()
  @Length(SESSION.USER_AGENT.MIN_LENGTH, SESSION.USER_AGENT.MAX_LENGTH)
  public readonly userAgent: string;

  @IsString()
  @IsNotEmpty()
  @Length(SESSION.ORIGIN.MIN_LENGTH, SESSION.ORIGIN.MAX_LENGTH)
  public readonly origin: string;

  @IsString()
  @IsNotEmpty()
  @Length(SESSION.LOCATION.MIN_LENGTH, SESSION.LOCATION.MAX_LENGTH)
  public readonly location: string;

  @IsUUID()
  public readonly accountUUID: string;
}
