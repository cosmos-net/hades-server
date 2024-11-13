import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_NAME } from '@common/infrastructure/controllers/constants';
import { ArchiveRoleCommand } from '@role/application/commands/use-cases/archive-role/archive-role.command';
import { ArchiveRoleInputDto } from '@role/infrastructure/controllers/commands/archive-role/archive-role-input.dto';
import { ArchiveRoleOutputDto } from '@role/infrastructure/controllers/commands/archive-role/archive-role-output.dto';

@Controller()
export class ArchiveRoleController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_NAME.HADES_ARCHIVE_ROLE })
  async archive(@Payload() archiveRoleDto: ArchiveRoleInputDto): Promise<ArchiveRoleOutputDto> {
    return this.commandBus.execute(new ArchiveRoleCommand({ uuid: archiveRoleDto.uuid }));
  }
}
