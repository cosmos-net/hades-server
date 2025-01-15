import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { SessionNotValidException } from '@session/domain/exceptions/session-not-valid.exception';
import { SessionModel } from '@session/domain/models/session.model';

export class TransitionStatusSessionDomainService {
  constructor(private readonly repositorySession: ISessionRepositoryContract) {}
  async go(uuid: string, status: SessionStatusEnum): Promise<SessionModel> {
    const sessionModel = await this.repositorySession.getOneBy(uuid);

    if (!sessionModel) {
      throw new SessionNotValidException(`Session with UUID ${uuid} not found`);
    }

    if (status === SessionStatusEnum.ACTIVE) {
      sessionModel.active();
    } else if (status === SessionStatusEnum.INACTIVE) {
      sessionModel.inactive();
    } else if (status === SessionStatusEnum.EXPIRED) {
      sessionModel.expire();
    } else if (status === SessionStatusEnum.CLOSED) {
      sessionModel.close();
    } else if (status === SessionStatusEnum.SUSPENDED) {
      sessionModel.suspend();
    } else if (status === SessionStatusEnum.INVALID) {
      sessionModel.invalid();
    } else if (status === SessionStatusEnum.PENDING) {
      sessionModel.pending();
    }

    return sessionModel;
  }
}
