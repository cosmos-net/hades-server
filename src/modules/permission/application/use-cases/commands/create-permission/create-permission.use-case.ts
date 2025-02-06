import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreatePermissionCommand } from '@permission/application/use-cases/commands/create-permission/create-permission.command';
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
    private readonly repository: IPermissionRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreatePermissionCommand): Promise<PermissionModel> {
    const permissionModel = this.publisher.mergeObjectContext(
      await this.domainService.createPermission(command),
    );

    await this.repository.persist(permissionModel);

    permissionModel.commit();

    return permissionModel;
  }
}
