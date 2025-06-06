import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CloseActiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-active/close-active-session/close-active-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { TransitionStatusSessionDomainService } from '@session/domain/domain-services/transition-status-session.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(CloseActiveSessionCommand)
export class CloseActiveSessionUseCase implements ICommandHandler<CloseActiveSessionCommand> {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
    private readonly publisher: EventPublisher,
    private readonly transitionStatusSessionDomainService: TransitionStatusSessionDomainService,
  ) {}

  async execute(command: CloseActiveSessionCommand): Promise<SessionModel> {
    const sessionModel = await this.transitionStatusSessionDomainService.go(
      command.uuid,
      command.status,
    );

    const sessionContext = this.publisher.mergeObjectContext(sessionModel);

    await this.repository.persist(sessionModel);

    sessionContext.commit();

    return sessionContext;
  }
}
