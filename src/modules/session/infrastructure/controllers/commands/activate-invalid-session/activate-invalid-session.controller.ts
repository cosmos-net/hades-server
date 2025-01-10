import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ActivateInvalidSessionCommand } from '@session/application/commands/use-cases/activate-invalid-session/activate-invalid-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { ActivateInvalidSessionInputDto } from '@session/infrastructure/controllers/commands/activate-invalid-session/activate-invalid-session.input.dto';
import { ActivateInvalidSessionOutputDto } from '@session/infrastructure/controllers/commands/activate-invalid-session/activate-invalid-session.output.dto';

@Controller()
export class ActivateInvalidSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.UPDATE })
  async update(
    @Payload() activateInactivateSessionInputDto: ActivateInvalidSessionInputDto,
  ): Promise<ActivateInvalidSessionOutputDto> {
    try {
      const result = await this.commandBus.execute<ActivateInvalidSessionCommand, SessionModel>(
        new ActivateInvalidSessionCommand({
          uuid: activateInactivateSessionInputDto.uuid,
          sessionDuration: activateInactivateSessionInputDto.sessionDuration,
          token: activateInactivateSessionInputDto.token,
          expiresInAt: activateInactivateSessionInputDto.expiresInAt,
          loggedInAt: activateInactivateSessionInputDto.loggedInAt,
          refreshToken: activateInactivateSessionInputDto.refreshToken,
        }),
      );
      return new ActivateInvalidSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
