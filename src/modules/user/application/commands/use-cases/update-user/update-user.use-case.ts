import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '@user/application/commands/use-cases/update-user/update-user.command';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UpdateUserDomainService } from '@user/domain/domain-services/update-user.domain-service';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateRolUseCase implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly UpdateUserDomainService: UpdateUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserAggregate> {
    const { uuid, accounts, profile } = command;

    const userAggregate = await this.UpdateUserDomainService.go({
      uuid,
      accounts,
      profile,
    });

    const user = this.publisher.mergeObjectContext(userAggregate);

    await this.repository.persist(userAggregate);

    user.commit();

    return userAggregate;
  }
}
