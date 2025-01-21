import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { ISessionOrchestratorConsumerContract } from '@session/domain/contracts/session-orchestrator-consumer.contract';
import { SessionNotValidException } from '@session/domain/exceptions/session-not-valid.exception';
import { SessionModel } from '@session/domain/models/session.model';
import { SessionInvalidType } from '@session/domain/schemas/session.schema-primitives';

export class CreateInvalidSessionDomainService {
  constructor(private readonly sessionOrchestratorConsumer: ISessionOrchestratorConsumerContract) {}

  async go(sessionInvalidType: SessionInvalidType, accountUUID: string): Promise<SessionModel> {
    const account = await this.sessionOrchestratorConsumer.account.getByUUID({
      uuid: accountUUID,
      withArchived: true,
      failIfArchived: true,
      includeSessions: true,
    });

    const { sessions: sessionList } = account;

    if (sessionList) {
      const sessions = sessionList.getItems;
      const session = sessions.find(
        (session): boolean => session.status === SessionStatusEnum.ACTIVE,
      );

      if (session) {
        throw new SessionNotValidException(
          `Account with UUID ${accountUUID} already has an active session with UUID ${session.uuid}`,
        );
      }
    }

    const session = new SessionModel(sessionInvalidType);

    session.useAccount(account);
    session.create();

    return session;
  }
}
