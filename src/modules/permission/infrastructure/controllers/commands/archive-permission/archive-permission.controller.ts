import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchivePermissionCommand } from '@permission/application/use-cases/commands/archive-permission/archive-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { ArchivePermissionInputDto } from '@permission/infrastructure/controllers/commands/archive-permission/archive-permission-input.dto';
import { ArchivePermissionOutputDto } from '@permission/infrastructure/controllers/commands/archive-permission/archive-permission-output.dto';

@Controller()
export class ArchivePermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.PERMISSION.ARCHIVE })
  async archivePermission(
    @Payload() archivePermissionDto: ArchivePermissionInputDto,
  ): Promise<ArchivePermissionOutputDto> {
    try {
      const result = await this.commandBus.execute<ArchivePermissionCommand, PermissionModel>(
        new ArchivePermissionCommand({ ...archivePermissionDto }),
      );

      return new ArchivePermissionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
