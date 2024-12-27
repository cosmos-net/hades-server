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

  constructor(root: CreateSessionOutputDto) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.sessionId = root.sessionId;
    this.sessionType = root.sessionType;
    this.sessionDuration = root.sessionDuration;
    this.sessionClosedType = root.sessionClosedType;
    this.token = root.token;
    this.expiresIn = root.expiresIn;
    this.loggedInAt = root.loggedInAt;
    this.loggedOutAt = root.loggedOutAt;
    this.ipAddress = root.ipAddress;
    this.refreshToken = root.refreshToken;
    this.userAgent = root.userAgent;
    this.failedAttempts = root.failedAttempts;
    this.origin = root.origin;
    this.location = root.location;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
  }
}
