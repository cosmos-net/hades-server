import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

import {
  MAX_SESSION_IP_ADDRESS_LENGTH,
  MAX_SESSION_LOCATION_LENGTH,
  MAX_SESSION_ORIGIN_LENGTH,
  MAX_SESSION_SESSION_CLOSED_TYPE_LENGTH,
  MAX_SESSION_SESSION_ID_LENGTH,
  MAX_SESSION_SESSION_TYPE_LENGTH,
  MAX_SESSION_USER_AGENT_LENGTH,
  MIN_SESSION_IP_ADDRESS_LENGTH,
  MIN_SESSION_LOCATION_LENGTH,
  MIN_SESSION_ORIGIN_LENGTH,
  MIN_SESSION_SESSION_CLOSED_TYPE_LENGTH,
  MIN_SESSION_SESSION_ID_LENGTH,
  MIN_SESSION_SESSION_TYPE_LENGTH,
  MIN_SESSION_USER_AGENT_LENGTH,
} from '@user/domain/constants/general-rules';

export class CreateSessionInput {
  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_SESSION_ID_LENGTH, MIN_SESSION_SESSION_ID_LENGTH)
  public readonly sessionId: string;

  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_SESSION_TYPE_LENGTH, MIN_SESSION_SESSION_TYPE_LENGTH)
  public readonly sessionType: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly sessionDuration: number;

  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_SESSION_CLOSED_TYPE_LENGTH, MIN_SESSION_SESSION_CLOSED_TYPE_LENGTH)
  public readonly sessionClosedType: string;

  @IsString()
  @IsNotEmpty()
  public readonly token: string;

  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_IP_ADDRESS_LENGTH, MIN_SESSION_IP_ADDRESS_LENGTH)
  public readonly ipAddress: string;

  @IsString()
  @IsNotEmpty()
  public readonly refreshToken: string;

  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_USER_AGENT_LENGTH, MIN_SESSION_USER_AGENT_LENGTH)
  public readonly userAgent: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly failedAttempts: number;

  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_ORIGIN_LENGTH, MIN_SESSION_ORIGIN_LENGTH)
  public readonly origin: string;

  @IsString()
  @IsNotEmpty()
  @Length(MAX_SESSION_LOCATION_LENGTH, MIN_SESSION_LOCATION_LENGTH)
  public readonly location: string;
}
