import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ActivateInactiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-inactive/activate-inactive-session/activate-inactive-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { TransitionStatusSessionDomainService } from '@session/domain/domain-services/transition-status-session.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(ActivateInactiveSessionCommand)
export class ActivateInactiveSessionUseCase
  implements ICommandHandler<ActivateInactiveSessionCommand>
{
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
    private readonly publisher: EventPublisher,
    private readonly transitionStatusSessionDomainService: TransitionStatusSessionDomainService,
  ) {}

  async execute(command: ActivateInactiveSessionCommand): Promise<SessionModel> {
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
