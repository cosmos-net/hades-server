import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyUserCommand } from '@user/application/commands/use-cases/destroy-user/destroy-user.command';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { DestroyUserDomainService } from '@user/domain/domain-services/destroy-user.domain-service';

@Injectable()
@CommandHandler(DestroyUserCommand)
export class DestroyUserUseCase implements ICommandHandler<DestroyUserCommand> {
  constructor(
    private readonly DestroyUserDomainService: DestroyUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: DestroyUserCommand): Promise<UserAggregate> {
    const { uuid } = command;

    const userAggregate = await this.DestroyUserDomainService.go(uuid);
    const userContext = this.publisher.mergeObjectContext(userAggregate);

    await this.repository.destroy(userAggregate);

    userContext.commit();

    return userContext;
  }
}
