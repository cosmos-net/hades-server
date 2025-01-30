import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ArchiveUserCommand } from '@user/application/use-cases/commands/archive-user/archive-user.command';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ArchiveUserDomainService } from '@user/domain/domain-services/archive-user.domain-service';

@Injectable()
@CommandHandler(ArchiveUserCommand)
export class ArchiveUserUseCase implements ICommandHandler<ArchiveUserCommand> {
  constructor(
    private readonly archiveUserDomainService: ArchiveUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: ArchiveUserCommand): Promise<UserAggregate> {
    const { uuid } = command;

    const userAggregate = await this.archiveUserDomainService.go(uuid);
    const { userModel, accountsModel, profileModel } = userAggregate;

    const aggregateContext = this.publisher.mergeObjectContext(userAggregate);

    this.publisher.mergeObjectContext(userModel);
    this.publisher.mergeObjectContext(profileModel);

    for (const accountModel of accountsModel) {
      this.publisher.mergeObjectContext(accountModel);
    }

    await this.repository.persist(userAggregate);

    aggregateContext.commit();

    return aggregateContext;
  }
}
