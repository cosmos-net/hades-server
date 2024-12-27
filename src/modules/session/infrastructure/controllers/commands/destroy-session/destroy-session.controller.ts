import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroySessionCommand } from '@session/application/commands/use-cases/destroy-session/destroy-session.command';
import { DestroySessionInputDto } from '@session/infrastructure/controllers/commands/destroy-session/destroy-session-input.dto';
import { DestroySessionOutputDto } from '@session/infrastructure/controllers/commands/destroy-session/destroy-session-output.dto';

@Controller()
export class DestroySessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.DESTROY })
  async destroy(
    @Payload() destroySessionDto: DestroySessionInputDto,
  ): Promise<DestroySessionOutputDto> {
    return this.commandBus.execute(new DestroySessionCommand({ uuid: destroySessionDto.uuid }));
  }
}
