import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyUserCommand } from '@user/application/commands/use-cases/destroy-user/destroy-user.command';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserModel } from '@user/domain/models/user.model';
import { DestroyUserDomainService } from '@user/domain/services/destroy-user.domain-service';

@Injectable()
@CommandHandler(DestroyUserCommand)
export class DestroyUserUseCase implements ICommandHandler<DestroyUserCommand> {
  constructor(
    private readonly DestroyUserDomainService: DestroyUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: DestroyUserCommand): Promise<UserModel> {
    const { uuid } = command;

    const userModel = await this.DestroyUserDomainService.go(uuid);
    const user = this.publisher.mergeObjectContext(userModel);

    await this.repository.destroy(uuid);

    user.commit();

    return user;
  }
}
