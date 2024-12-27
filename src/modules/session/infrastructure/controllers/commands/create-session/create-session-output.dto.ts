export class CreateSessionOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly sessionId: string;
  public readonly sessionType: string;
  public readonly sessionDuration: number;
  public readonly sessionClosedType: string;
  public readonly token: string;
  public readonly expiresIn: Date;
  public readonly loggedInAt: Date;
  public readonly loggedOutAt: Date;
  public readonly ipAddress: string;
  public readonly refreshToken: string;
  public readonly userAgent: string;
  public readonly failedAttempts: number;
  public readonly origin: string;
  public readonly location: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}