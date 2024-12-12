import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateSessionInput {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  public readonly sessionId: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  public readonly sessionType: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly sessionDuration: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  public readonly sessionClosedType: string;

  @IsString()
  @IsNotEmpty()
  public readonly token: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  public readonly ipAddress: string;

  @IsString()
  @IsNotEmpty()
  public readonly refreshToken: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  public readonly userAgent: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly failedAttempts: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  public readonly origin: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  public readonly location: string;
}
