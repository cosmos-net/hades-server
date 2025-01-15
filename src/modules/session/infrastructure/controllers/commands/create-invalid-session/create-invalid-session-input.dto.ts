import { IsString, IsNotEmpty, Length, IsUUID } from 'class-validator';

import { SESSION } from '@session/domain/constants/general-rules';

export class CreateInvalidSessionInput {
  @IsString()
  @IsNotEmpty()
  @Length(SESSION.SESSION_TYPE.MIN_LENGTH, SESSION.SESSION_TYPE.MAX_LENGTH)
  public readonly sessionType: string;

  @IsString()
  @IsNotEmpty()
  @Length(SESSION.IP_ADDRESS.MIN_LENGTH, SESSION.IP_ADDRESS.MAX_LENGTH)
  public readonly ipAddress: string;

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
