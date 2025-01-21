import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { SessionNotFoundException } from '@session/domain/exceptions/session-not-found.exception';
import { SessionModel } from '@session/domain/models/session.model';

export class DestroySessionDomainService {
  constructor(private readonly sessionRepository: ISessionRepositoryContract) {}

  async go(uuid: string): Promise<SessionModel> {
    const sessionModel = await this.sessionRepository.getOneBy(uuid, { withArchived: true });

    if (!sessionModel) {
      throw new SessionNotFoundException(`Session with uuid ${uuid} not found`);
    }

    sessionModel.destroy(sessionModel.uuid, sessionModel.sessionId);

    return sessionModel;
  }
}
