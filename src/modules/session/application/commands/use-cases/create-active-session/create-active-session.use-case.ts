import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateActiveSessionCommand } from '@session/application/commands/use-cases/create-active-session/create-active-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { CreateActiveSessionDomainService } from '@session/domain/domain-services/create-session-active.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(CreateActiveSessionCommand)
export class CreateActiveSessionUseCase implements ICommandHandler<CreateActiveSessionCommand> {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
    private readonly publisher: EventPublisher,
    private readonly createSessionDomainService: CreateActiveSessionDomainService,
  ) {}

  async execute(command: CreateActiveSessionCommand): Promise<SessionModel> {
    const sessionModel = await this.createSessionDomainService.go(command, command.accountUUID);

    const sessionContext = this.publisher.mergeObjectContext(sessionModel);

    await this.repository.persist(sessionModel);

    sessionContext.commit();

    return sessionContext;
  }
}
