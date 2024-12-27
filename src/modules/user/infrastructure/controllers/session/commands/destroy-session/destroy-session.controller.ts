import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroySessionCommand } from '@user/application/commands/use-cases/session/destroy-session/destroy-session.command';
import { DestroySessionInputDto } from '@user/infrastructure/controllers//session/commands/destroy-session/destroy-session-input.dto';
import { DestroySessionOutputDto } from '@user/infrastructure/controllers/session/commands/destroy-session/destroy-session-output.dto';

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
