import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionNotValidException } from '@session/domain/exceptions/session-not-valid.exception';
import { SessionModel } from '@session/domain/models/session.model';
import { ISessionBaseSchema } from '@session/domain/schemas/session.schema-primitives';
import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';

export class CreateActiveSessionDomainService {
  constructor(private readonly repositoryAccount: IAccountRepositoryContract) {}

  async go(sessionBaseSchema: ISessionBaseSchema, accountUUID: string): Promise<SessionModel> {
    const account = await this.repositoryAccount.getOneBy(accountUUID, {
      withArchived: true,
      include: ['sessions'],
    });

    if (!account) {
      throw new SessionNotValidException(`Account with UUID ${accountUUID} not found`);
    }

    if (account.archivedAt) {
      throw new SessionNotValidException(`Account with UUID ${accountUUID} is archived`);
    }

    //TODO: validate if user is active

    const { sessions: sessionList } = account;

    if (sessionList) {
      const sessions = sessionList.getItems;
      const isActiveSession = sessions.find(
        (session): boolean => session.status === SessionStatusEnum.ACTIVE,
      );

      if (isActiveSession) {
        throw new SessionNotValidException(
          `Account with UUID ${accountUUID} already has an active session with UUID ${isActiveSession.uuid}`,
        );
      }
    }

    const session = new SessionModel(sessionBaseSchema);

    session.useAccount(account);
    session.create();

    return session;
  }
}
