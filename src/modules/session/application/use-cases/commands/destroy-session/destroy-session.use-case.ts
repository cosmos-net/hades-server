import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroySessionCommand } from '@session/application/use-cases/commands/destroy-session/destroy-session.command';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ISessionRepositoryContract } from '@session/domain/contracts/session-repository.contract';
import { DestroySessionDomainService } from '@session/domain/domain-services/destroy-session.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@CommandHandler(DestroySessionCommand)
export class DestroySessionUseCase implements ICommandHandler<DestroySessionCommand> {
  constructor(
    private readonly destroySessionDomainService: DestroySessionDomainService,
    private readonly publisher: EventPublisher,
    @Inject(SESSION_REPOSITORY)
    private readonly repository: ISessionRepositoryContract,
  ) {}

  async execute(command: DestroySessionCommand): Promise<SessionModel> {
    const { uuid } = command;

    const sessionModel = await this.destroySessionDomainService.go(uuid);
    const session = this.publisher.mergeObjectContext(sessionModel);

    await this.repository.destroy(uuid);

    session.commit();

    return session;
  }
}
