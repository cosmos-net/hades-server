import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UnarchivePermissionCommand } from '@permission/application/use-cases/commands/unarchive-permission/unarchive-permission.command';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { UnarchivePermissionDomainService } from '@permission/domain/domain-services/unarchive-permission.domain-service';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
@CommandHandler(UnarchivePermissionCommand)
export class UnarchivePermissionUseCase
  implements ICommandHandler<UnarchivePermissionCommand, PermissionModel>
{
  constructor(
    private readonly domainService: UnarchivePermissionDomainService,
    @Inject(PERMISSION_REPOSITORY)
    private readonly repository: IPermissionRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UnarchivePermissionCommand): Promise<PermissionModel> {
    const permissionModel = this.publisher.mergeObjectContext(
      await this.domainService.go(command.uuid),
    );

    await this.repository.persist(permissionModel);

    permissionModel.commit();

    return permissionModel;
  }
}
