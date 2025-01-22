import { Criteria } from '@common/domain/criteria/criteria';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { SessionNotFoundException } from '@session/domain/exceptions/session-not-found.exception';
import { ListSessionModel } from '@session/domain/models/session-list.model';

export class ListSessionDomainService {
  constructor(private readonly sessionRepository: ISessionRepositoryContract) {}

  async go(criteria: Criteria): Promise<ListSessionModel> {
    const sessions = await this.sessionRepository.matching(criteria);

    if (sessions.getTotal === 0) {
      throw new SessionNotFoundException('Sessions not found');
    }

    return sessions;
  }
}
