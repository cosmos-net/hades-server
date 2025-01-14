import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { IncrementFailedAttemptsSessionCommand } from '@session/application/use-cases/commands/increment-failed-attempts-session/increment-failed-attempts-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { IncrementFailedAttemptsSessionDomainService } from '@session/domain/domain-services/increment-failed-attempts-session.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(IncrementFailedAttemptsSessionCommand)
export class IncrementFailedAttemptsSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
    private readonly publisher: EventPublisher,
    private readonly incrementFailedAttemptsSessionDomainService: IncrementFailedAttemptsSessionDomainService,
  ) {}

  async execute(command: IncrementFailedAttemptsSessionCommand): Promise<SessionModel> {
    const sessionModel = await this.incrementFailedAttemptsSessionDomainService.go(command.uuid);

    const sessionContext = this.publisher.mergeObjectContext(sessionModel);

    await this.repository.persist(sessionModel);

    sessionContext.commit();

    return sessionContext;
  }
}
