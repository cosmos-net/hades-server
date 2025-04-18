import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreatePermissionCommand } from '@permission/application/use-cases/commands/create-permission/create-permission.command';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { CreatePermissionDomainService } from '@permission/domain/domain-services/create-permission.domain-service';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
@CommandHandler(CreatePermissionCommand)
export class CreatePermissionUseCase
  implements ICommandHandler<CreatePermissionCommand, PermissionModel>
{
  constructor(
    private readonly domainService: CreatePermissionDomainService,
    @Inject(PERMISSION_REPOSITORY)
    private readonly repository: IPermissionRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreatePermissionCommand): Promise<PermissionModel> {
    const permissionModel = this.publisher.mergeObjectContext(await this.domainService.go(command));

    await this.repository.persist(permissionModel);

    permissionModel.commit();

    return permissionModel;
  }
}
