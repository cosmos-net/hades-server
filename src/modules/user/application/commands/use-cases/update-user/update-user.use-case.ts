import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserDomainService } from '@user/domain/services/update-user.domain-service';

import { UpdateUserCommand } from '@user/application/commands/use-cases/update-user/update-user.command';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserModel } from '@user/domain/models/user.model';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateRolUseCase implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly UpdateUserDomainService: UpdateUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserModel> {
    const { account, profile } = command;

    const userModel = await this.UpdateUserDomainService.go(account, profile);
    const user = this.publisher.mergeObjectContext(userModel);

    await this.repository.persist(userModel);

    user.commit();

    return user;
  }
}
