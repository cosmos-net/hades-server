import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ActivateInvalidSessionCommand } from '@session/application/use-cases/commands/activate-invalid-session/activate-invalid-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { ActivateInvalidSessionDomainService } from '@session/domain/domain-services/activate-invalid-session.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(ActivateInvalidSessionCommand)
export class ActiveInvalidSessionUseCase implements ICommandHandler<ActivateInvalidSessionCommand> {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
    private readonly publisher: EventPublisher,
    private readonly activateInvalidSessionDomainService: ActivateInvalidSessionDomainService,
  ) {}

  async execute(command: ActivateInvalidSessionCommand): Promise<SessionModel> {
    const sessionModel = await this.activateInvalidSessionDomainService.go(command);

    const sessionContext = this.publisher.mergeObjectContext(sessionModel);

    await this.repository.persist(sessionModel);

    sessionContext.commit();

    return sessionContext;
  }
}
