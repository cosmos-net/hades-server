import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UpdateRoleCommand } from '@role/application/commands/use-cases/update-role/update-role.command';
import { UpdateRoleInputDto } from '@role/infrastructure/controllers/commands/update-role/update-role-input.dto';
import { UpdateRoleOutputDto } from '@role/infrastructure/controllers/commands/update-role/update-role-output.dto';

@Controller()
export class UpdateRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.UPDATE })
  async update(@Payload() updateRoleInputDto: UpdateRoleInputDto): Promise<UpdateRoleOutputDto> {
    return this.commandBus.execute(
      new UpdateRoleCommand({
        name: updateRoleInputDto.name,
        description: updateRoleInputDto.description,
      }),
    );
  }
}
