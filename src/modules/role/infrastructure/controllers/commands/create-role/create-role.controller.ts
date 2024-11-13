import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleCommand } from '@role/application/commands/use-cases/create-rol/create-rol.command';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_NAME } from '@common/infrastructure/controllers/constants';
import { CreateRoleInput } from '@role/infrastructure/controllers/commands/create-role/create-role-input.dto';
import { CreateRoleOutputDto } from '@role/infrastructure/controllers/commands/create-role/create-role-output.dto';

@Controller()
export class CreateRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_NAME.HADES_CREATE_ROLE })
  async create(@Payload() createRoleDto: CreateRoleInput): Promise<CreateRoleOutputDto> {
    const uuid = UUIDv4();

    return this.commandBus.execute(new CreateRoleCommand({ ...createRoleDto, uuid }));
  }
}
