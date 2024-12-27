import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveSessionCommand } from '@user/application/commands/use-cases/session/archive-session/archive-session.command';
import { ArchiveSessionInputDto } from '@user/infrastructure/controllers/session/commands/archive-session/archive-session-input.dto';
import { ArchiveSessionOutputDto } from '@user/infrastructure/controllers/session/commands/archive-session/archive-session-output.dto';

@Controller()
export class ArchiveSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.ARCHIVE })
  async archive(
    @Payload() archiveSessionDto: ArchiveSessionInputDto,
  ): Promise<ArchiveSessionOutputDto> {
    return this.commandBus.execute(new ArchiveSessionCommand({ uuid: archiveSessionDto.uuid }));
  }
}
