import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionModel } from '@session/domain/models/session.model';

export class CreateInvalidSessionOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly sessionType: string;
  public readonly ipAddress: string;
  public readonly userAgent: string;
  public readonly origin: string;
  public readonly location: string;
  public readonly status: SessionStatusEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(session: SessionModel) {
    this.id = session.id;
    this.uuid = session.uuid;
    this.sessionType = session.sessionType;
    this.ipAddress = session.ipAddress;
    this.userAgent = session.userAgent;
    this.origin = session.origin;
    this.location = session.location;
    this.status = session.status;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}
