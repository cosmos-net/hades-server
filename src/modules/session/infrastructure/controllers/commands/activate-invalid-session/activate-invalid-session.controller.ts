import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ActivateInactiveSessionCommand } from '@session/application/commands/use-cases/activate-invalid-session/activate-invalid-session.command';
import { ActivateInvalidSessionInputDto } from '@session/infrastructure/controllers/commands/activate-invalid-session/activate-invalid-session.input.dto';
import { ActivateInvalidSessionOutputDto } from '@session/infrastructure/controllers/commands/activate-invalid-session/activate-invalid-session.output.dto';

@Controller()
export class ActivateInvalidSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.UPDATE })
  async update(
    @Payload() activateInactivateSessionInputDto: ActivateInvalidSessionInputDto,
  ): Promise<ActivateInvalidSessionOutputDto> {
    //TODO: Catch error with try catch and use RpcException to handle error
    return this.commandBus.execute(
      new ActivateInactiveSessionCommand({
        uuid: activateInactivateSessionInputDto.uuid,
        sessionClosedType: activateInactivateSessionInputDto.sessionClosedType,
        loggedOutAt: activateInactivateSessionInputDto.loggedOutAt,
        refreshToken: activateInactivateSessionInputDto.refreshToken,
        failedAttempts: activateInactivateSessionInputDto.failedAttempts,
      }),
    );
  }
}
