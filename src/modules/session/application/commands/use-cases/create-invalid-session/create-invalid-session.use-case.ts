import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateInvalidSessionCommand } from '@session/application/commands/use-cases/create-invalid-session/create-invalid-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { CreateInvalidSessionDomainService } from '@session/domain/domain-services/create-session-invalid.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(CreateInvalidSessionCommand)
export class CreateInvalidSessionUseCase implements ICommandHandler<CreateInvalidSessionCommand> {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
    private readonly publisher: EventPublisher,
    private readonly createInvalidSessionDomainService: CreateInvalidSessionDomainService,
  ) {}

  async execute(command: CreateInvalidSessionCommand): Promise<SessionModel> {
    const sessionModel = await this.createInvalidSessionDomainService.go(
      command,
      command.accountUUID,
    );

    const sessionContext = this.publisher.mergeObjectContext(sessionModel);

    await this.repository.persist(sessionModel);

    sessionContext.commit();

    return sessionContext;
  }
}
