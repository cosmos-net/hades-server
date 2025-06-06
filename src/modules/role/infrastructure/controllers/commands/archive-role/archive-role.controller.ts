import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveRoleCommand } from '@role/application/use-cases/commands/archive-role/archive-role.command';
import { RoleModel } from '@role/domain/models/role.model';
import { ArchiveRoleInputDto } from '@role/infrastructure/controllers/commands/archive-role/archive-role-input.dto';
import { ArchiveRoleOutputDto } from '@role/infrastructure/controllers/commands/archive-role/archive-role-output.dto';

@Controller()
export class ArchiveRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.ARCHIVE })
  async archive(@Payload() archiveRoleDto: ArchiveRoleInputDto): Promise<ArchiveRoleOutputDto> {
    try {
      const result = await this.commandBus.execute<ArchiveRoleCommand, RoleModel>(
        new ArchiveRoleCommand({ uuid: archiveRoleDto.uuid }),
      );

      return new ArchiveRoleOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
