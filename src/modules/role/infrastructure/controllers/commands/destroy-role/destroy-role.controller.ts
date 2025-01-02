import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroyRoleCommand } from '@role/application/commands/use-cases/destroy-role/destroy-role.command';
import { RoleModel } from '@role/domain/models/role.model';
import { DestroyRoleInputDto } from '@role/infrastructure/controllers/commands/destroy-role/destroy-role-input.dto';
import { DestroyRoleOutputDto } from '@role/infrastructure/controllers/commands/destroy-role/destroy-role-output.dto';

@Controller()
export class DestroyRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.DESTROY })
  async create(@Payload() destroyRoleInputDto: DestroyRoleInputDto): Promise<DestroyRoleOutputDto> {
    try {
      const result = await this.commandBus.execute<DestroyRoleCommand, RoleModel>(
        new DestroyRoleCommand({ uuid: destroyRoleInputDto.uuid }),
      );

      return new DestroyRoleOutputDto(!!result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
