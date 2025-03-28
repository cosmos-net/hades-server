import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UpdateRoleCommand } from '@role/application/use-cases/commands/update-role/update-role.command';
import { RoleModel } from '@role/domain/models/role.model';
import { UpdateRoleInputDto } from '@role/infrastructure/controllers/commands/update-role/update-role-input.dto';
import { UpdateRoleOutputDto } from '@role/infrastructure/controllers/commands/update-role/update-role-output.dto';

@Controller()
export class UpdateRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.UPDATE })
  async update(@Payload() updateRoleInputDto: UpdateRoleInputDto): Promise<UpdateRoleOutputDto> {
    try {
      const result = await this.commandBus.execute<UpdateRoleCommand, RoleModel>(
        new UpdateRoleCommand({
          uuid: updateRoleInputDto.uuid,
          name: updateRoleInputDto.name,
          description: updateRoleInputDto.description,
        }),
      );

      return new UpdateRoleOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
