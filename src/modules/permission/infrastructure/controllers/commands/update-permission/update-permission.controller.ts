import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UpdatePermissionCommand } from '@permission/application/use-cases/commands/update-permission/update-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { UpdatePermissionInputDto } from '@permission/infrastructure/controllers/commands/update-permission/update-permission-input.dto';
import { UpdatePermissionOutputDto } from '@permission/infrastructure/controllers/commands/update-permission/update-permission-output.dto';

@Controller()
export class UpdatePermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.PERMISSION.UPDATE })
  async updatePermission(
    @Payload() updatePermissionDto: UpdatePermissionInputDto,
  ): Promise<UpdatePermissionOutputDto> {
    try {
      const result = await this.commandBus.execute<UpdatePermissionCommand, PermissionModel>(
        new UpdatePermissionCommand({ ...updatePermissionDto }),
      );

      return new UpdatePermissionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
