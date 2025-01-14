import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionModel } from '@session/domain/models/session.model';

export class IncrementFailedAttemptsSessionOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly totalFailedAttempts: number;
  public readonly status: SessionStatusEnum;

  constructor(session: SessionModel) {
    this.id = session.id;
    this.uuid = session.uuid;
    this.totalFailedAttempts = session.totalFailedAttempts;
    this.status = session.status;
  }
}
