import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '@user/application/commands/use-cases/create-user/create-user.command';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { CreateUserDomainService } from '@user/domain/domain-services/create-user.domain-service';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly createUserDomainService: CreateUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserAggregate> {
    const { accounts, profile } = command;

    const userAggregate = await this.createUserDomainService.go(accounts, profile);
    const userContext = this.publisher.mergeObjectContext(userAggregate);

    await this.repository.persist(userAggregate);

    userContext.commit();

    return userContext;
  }
}
