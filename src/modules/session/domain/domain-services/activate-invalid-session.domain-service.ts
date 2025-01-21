import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { SessionNotValidException } from '@session/domain/exceptions/session-not-valid.exception';
import { SessionModel } from '@session/domain/models/session.model';
import { ISessionActivateInvalidSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';

export class ActivateInvalidSessionDomainService {
  constructor(private readonly repositorySession: ISessionRepositoryContract) {}

  async go(schema: ISessionActivateInvalidSchemaPrimitives): Promise<SessionModel> {
    const sessionModel = await this.repositorySession.getOneBy(schema.uuid);

    if (!sessionModel) {
      throw new SessionNotValidException(`Session with UUID ${schema.uuid} not found`);
    }

    if (sessionModel.status !== SessionStatusEnum.INVALID) {
      throw new SessionNotValidException(
        `Session with UUID ${schema.uuid} requires status ${SessionStatusEnum.INVALID}, but has status ${sessionModel.status}`,
      );
    }

    sessionModel.active();

    return sessionModel;
  }
}
