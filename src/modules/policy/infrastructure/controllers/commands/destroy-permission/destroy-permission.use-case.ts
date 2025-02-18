import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyPermissionCommand } from '@permission/application/use-cases/commands/destroy-permission/destroy-permission.command';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { DestroyPermissionDomainService } from '@permission/domain/domain-services/destroy-permission.domain-service';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
@CommandHandler(DestroyPermissionCommand)
export class DestroyPermissionUseCase
  implements ICommandHandler<DestroyPermissionCommand, PermissionModel>
{
  constructor(
    private readonly domainService: DestroyPermissionDomainService,
    @Inject(PERMISSION_REPOSITORY)
    private readonly repository: IPermissionRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DestroyPermissionCommand): Promise<PermissionModel> {
    const permissionModel = this.publisher.mergeObjectContext(
      await this.domainService.go(command.uuid),
    );

    await this.repository.persist(permissionModel);

    permissionModel.commit();

    return permissionModel;
  }
}
