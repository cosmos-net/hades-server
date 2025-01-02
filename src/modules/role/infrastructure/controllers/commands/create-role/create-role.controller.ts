import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreateRoleCommand } from '@role/application/commands/use-cases/create-role/create-role.command';
import { RoleModel } from '@role/domain/models/role.model';
import { CreateRoleInput } from '@role/infrastructure/controllers/commands/create-role/create-role-input.dto';
import { CreateRoleOutputDto } from '@role/infrastructure/controllers/commands/create-role/create-role-output.dto';

@Controller()
export class CreateRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.CREATE })
  async create(@Payload() createRoleDto: CreateRoleInput): Promise<CreateRoleOutputDto> {
    try {
      const uuid = UUIDv4();
      const result = await this.commandBus.execute<CreateRoleCommand, RoleModel>(
        new CreateRoleCommand({ ...createRoleDto, uuid }),
      );

      return new CreateRoleOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
