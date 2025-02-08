import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UnarchivePermissionCommand } from '@permission/application/use-cases/commands/unarchive-permission/unarchive-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { UnarchivePermissionInputDto } from '@permission/infrastructure/controllers/commands/unarchive-permission/unarchive-permission-input.dto';
import { UnarchivePermissionOutputDto } from '@permission/infrastructure/controllers/commands/unarchive-permission/unarchive-permission-output.dto';

@Controller()
export class UnarchivePermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.PERMISSION.UPDATE })
  async unarchivePermission(
    @Payload() unarchivePermissionDto: UnarchivePermissionInputDto,
  ): Promise<UnarchivePermissionOutputDto> {
    try {
      const result = await this.commandBus.execute<UnarchivePermissionCommand, PermissionModel>(
        new UnarchivePermissionCommand({ ...unarchivePermissionDto }),
      );

      return new UnarchivePermissionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
