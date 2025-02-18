import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ArchivePermissionCommand } from '@permission/application/use-cases/commands/archive-permission/archive-permission.command';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { ArchivePermissionDomainService } from '@permission/domain/domain-services/archive-permission.domain-service';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
@CommandHandler(ArchivePermissionCommand)
export class ArchivePermissionUseCase
  implements ICommandHandler<ArchivePermissionCommand, PermissionModel>
{
  constructor(
    private readonly domainService: ArchivePermissionDomainService,
    @Inject(PERMISSION_REPOSITORY)
    private readonly repository: IPermissionRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ArchivePermissionCommand): Promise<PermissionModel> {
    const permissionModel = this.publisher.mergeObjectContext(
      await this.domainService.go(command.uuid),
    );

    await this.repository.persist(permissionModel);

    permissionModel.commit();

    return permissionModel;
  }
}
