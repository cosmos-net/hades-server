import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionModel } from '@session/domain/models/session.model';

export class CreateActiveSessionOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly sessionId: string;
  public readonly sessionType: string;
  public readonly sessionDuration: number;
  public readonly token: string;
  public readonly expiresInAt: Date;
  public readonly loggedInAt: Date;
  public readonly ipAddress: string;
  public readonly refreshToken: string;
  public readonly userAgent: string;
  public readonly failedAttempts: number;
  public readonly origin: string;
  public readonly location: string;
  public readonly status: SessionStatusEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(session: SessionModel) {
    this.id = session.id;
    this.uuid = session.uuid;
    this.sessionId = session.sessionId;
    this.sessionType = session.sessionType;
    this.sessionDuration = session.sessionDuration;
    this.token = session.token;
    this.expiresInAt = session.expiresInAt;
    this.loggedInAt = session.loggedInAt;
    this.ipAddress = session.ipAddress;
    this.refreshToken = session.refreshToken;
    this.userAgent = session.userAgent;
    this.failedAttempts = session.failedAttempts;
    this.origin = session.origin;
    this.location = session.location;
    this.status = session.status;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}
