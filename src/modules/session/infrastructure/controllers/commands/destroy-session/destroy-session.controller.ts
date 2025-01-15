import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroySessionCommand } from '@session/application/use-cases/commands/destroy-session/destroy-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { DestroySessionInputDto } from '@session/infrastructure/controllers/commands/destroy-session/destroy-session-input.dto';
import { DestroySessionOutputDto } from '@session/infrastructure/controllers/commands/destroy-session/destroy-session-output.dto';

@Controller()
export class DestroySessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.DESTROY })
  async destroy(
    @Payload() destroySessionDto: DestroySessionInputDto,
  ): Promise<DestroySessionOutputDto> {
    try {
      const result = await this.commandBus.execute<DestroySessionCommand, SessionModel>(
        new DestroySessionCommand({ uuid: destroySessionDto.uuid }),
      );

      return new DestroySessionOutputDto(!!result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
