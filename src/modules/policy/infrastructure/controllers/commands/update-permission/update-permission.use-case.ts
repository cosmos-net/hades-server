import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdatePermissionCommand } from '@permission/application/use-cases/commands/update-permission/update-permission.command';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { UpdatePermissionDomainService } from '@permission/domain/domain-services/update-permission.domain-service';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionUseCase
  implements ICommandHandler<UpdatePermissionCommand, PermissionModel>
{
  constructor(
    private readonly domainService: UpdatePermissionDomainService,
    @Inject(PERMISSION_REPOSITORY)
    private readonly repository: IPermissionRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdatePermissionCommand): Promise<PermissionModel> {
    const permissionModel = this.publisher.mergeObjectContext(
      await this.domainService.go(command.uuid, command.description),
    );

    await this.repository.persist(permissionModel);

    permissionModel.commit();

    return permissionModel;
  }
}
