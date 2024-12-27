import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveRoleCommand } from '@role/application/commands/use-cases/archive-role/archive-role.command';
import { ArchiveRoleInputDto } from '@role/infrastructure/controllers/commands/archive-role/archive-role-input.dto';
import { ArchiveRoleOutputDto } from '@role/infrastructure/controllers/commands/archive-role/archive-role-output.dto';
import { RoleModel } from '@role/domain/models/role.model';

@Controller()
export class ArchiveRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.ARCHIVE })
  async archive(@Payload() archiveRoleDto: ArchiveRoleInputDto): Promise<ArchiveRoleOutputDto> {
    try {
      const result = await this.commandBus.execute<ArchiveRoleCommand, RoleModel>(new ArchiveRoleCommand({ uuid: archiveRoleDto.uuid }));

      return new ArchiveRoleOutputDto(result);
    } catch (error: any) {
      throw new RpcException(error);
    }
    
  }
}
