import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroyPermissionCommand } from '@permission/application/use-cases/commands/destroy-permission/destroy-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { DestroyPermissionInputDto } from '@permission/infrastructure/controllers/commands/destroy-permission/destroy-permission-input.dto';
import { DestroyPermissionOutputDto } from '@permission/infrastructure/controllers/commands/destroy-permission/destroy-permission-output.dto';

@Controller()
export class DestroyPermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.PERMISSION.DESTROY })
  async create(
    @Payload() destroyPermissionInputDto: DestroyPermissionInputDto,
  ): Promise<DestroyPermissionOutputDto> {
    try {
      const result = await this.commandBus.execute<DestroyPermissionCommand, PermissionModel>(
        new DestroyPermissionCommand({ uuid: destroyPermissionInputDto.uuid }),
      );

      return new DestroyPermissionOutputDto(!!result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
