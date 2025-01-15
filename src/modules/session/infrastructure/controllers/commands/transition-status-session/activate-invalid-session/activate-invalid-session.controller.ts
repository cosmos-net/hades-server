import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ActivateInvalidSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-invalid/activate-invalid-session/activate-invalid-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { ActivateInvalidSessionInputDto } from '@session/infrastructure/controllers/commands/transition-status-session/activate-invalid-session/activate-invalid-session.input.dto';
import { ActivateInvalidSessionOutputDto } from '@session/infrastructure/controllers/commands/transition-status-session/activate-invalid-session/activate-invalid-session.output.dto';

@Controller()
export class ActivateInvalidSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.ACTIVATE_INVALID })
  async activateInvalidSession(
    @Payload() activateInactivateSessionInputDto: ActivateInvalidSessionInputDto,
  ): Promise<ActivateInvalidSessionOutputDto> {
    try {
      const result = await this.commandBus.execute<ActivateInvalidSessionCommand, SessionModel>(
        new ActivateInvalidSessionCommand({
          uuid: activateInactivateSessionInputDto.uuid,
          sessionDuration: activateInactivateSessionInputDto.sessionDuration,
          token: activateInactivateSessionInputDto.token,
          expiresInAt: new Date(activateInactivateSessionInputDto.expiresInAt),
          loggedInAt: new Date(activateInactivateSessionInputDto.loggedInAt),
          refreshToken: activateInactivateSessionInputDto.refreshToken,
        }),
      );

      return new ActivateInvalidSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
