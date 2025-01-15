import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { SessionNotFoundException } from '@session/domain/exceptions/session-not-found.exception';
import { SessionModel } from '@session/domain/models/session.model';

export class GetSessionDomainService {
  constructor(private readonly repository: ISessionRepositoryContract) {}

  async go(uuid: string, withArchived?: boolean): Promise<SessionModel> {
    const sessionModel = await this.repository.getOneBy(uuid, { withArchived });

    if (!sessionModel) {
      throw new SessionNotFoundException(`Session with uuid: ${uuid} not found`);
    }

    return sessionModel;
  }
}
