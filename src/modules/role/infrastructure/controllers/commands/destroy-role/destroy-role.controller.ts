import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_NAME } from '@common/infrastructure/controllers/constants';
import { DestroyRoleCommand } from '@role/application/commands/use-cases/destroy-role/destroy-role.command';
import { DestroyRoleInputDto } from '@role/infrastructure/controllers/commands/destroy-role/destroy-role-input.dto';
import { DestroyRoleOutputDto } from '@role/infrastructure/controllers/commands/destroy-role/destroy-role-output.dto';

@Controller()
export class DestroyRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_NAME.HADES_DESTROY_ROLE })
  async create(@Payload() destroyRoleInputDto: DestroyRoleInputDto): Promise<DestroyRoleOutputDto> {
    return this.commandBus.execute(new DestroyRoleCommand({ uuid: destroyRoleInputDto.uuid }));
  }
}
