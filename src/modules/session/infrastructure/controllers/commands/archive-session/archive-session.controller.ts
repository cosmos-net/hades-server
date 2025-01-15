import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveSessionCommand } from '@session/application/use-cases/commands//archive-session/archive-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { ArchiveSessionInputDto } from '@session/infrastructure/controllers/commands/archive-session/archive-session-input.dto';
import { ArchiveSessionOutputDto } from '@session/infrastructure/controllers/commands/archive-session/archive-session-output.dto';

@Controller()
export class ArchiveSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.ARCHIVE })
  async archive(
    @Payload() archiveSessionDto: ArchiveSessionInputDto,
  ): Promise<ArchiveSessionOutputDto> {
    try {
      const result = await this.commandBus.execute<ArchiveSessionCommand, SessionModel>(
        new ArchiveSessionCommand({ uuid: archiveSessionDto.uuid }),
      );

      return new ArchiveSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
