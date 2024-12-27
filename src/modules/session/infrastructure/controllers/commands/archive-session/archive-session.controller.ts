import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveSessionCommand } from '@session/application/commands/use-cases/archive-session/archive-session.command';
import { ArchiveSessionInputDto } from '@session/infrastructure/controllers/commands/archive-session/archive-session-input.dto';
import { ArchiveSessionOutputDto } from '@session/infrastructure/controllers/commands/archive-session/archive-session-output.dto';
import { SessionModel } from '@session/domain/models/session.model';

@Controller()
export class ArchiveSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.ARCHIVE })
  async archive(@Payload() archiveSessionDto: ArchiveSessionInputDto): Promise<ArchiveSessionOutputDto>{
    try {
          const result = await this.commandBus.execute<ArchiveSessionCommand, SessionModel>(new ArchiveSessionCommand({ uuid: archiveSessionDto.uuid }));
    
          return new ArchiveSessionOutputDto(result);
        } catch (error: any) {
          throw new RpcException(error);
        }
  }
}
