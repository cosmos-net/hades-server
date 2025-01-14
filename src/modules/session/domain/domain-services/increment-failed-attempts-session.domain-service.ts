import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { SessionNotFoundException } from '@session/domain/exceptions/session-not-found.exception';
import { SessionNotValidException } from '@session/domain/exceptions/session-not-valid.exception';
import { SessionModel } from '@session/domain/models/session.model';

export class IncrementFailedAttemptsSessionDomainService {
  constructor(private readonly repositorySession: ISessionRepositoryContract) {}

  async go(uuid: string): Promise<SessionModel> {
    const session = await this.repositorySession.getOneBy(uuid, {
      withArchived: true,
    });

    if (!session) {
      throw new SessionNotFoundException(`Account with UUID ${uuid} not found`);
    }

    if (session.archivedAt) {
      throw new SessionNotValidException(`Account with UUID ${uuid} is archived`);
    }

    session.incrementFailedAttempts();

    return session;
  }
}
