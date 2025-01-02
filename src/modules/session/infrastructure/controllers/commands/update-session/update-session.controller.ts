import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UpdateSessionCommand } from '@session/application/commands/use-cases/update-session/update-session.command';
import { UpdateSessionInputDto } from '@session/infrastructure/controllers/commands/update-session/update-session.input.dto';
import { UpdateSessionOutputDto } from '@session/infrastructure/controllers/commands/update-session/update-session.output.dto';

@Controller()
export class UpdateSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.UPDATE })
  async update(
    @Payload() updateSessionInputDto: UpdateSessionInputDto,
  ): Promise<UpdateSessionOutputDto> {
    return this.commandBus.execute(
      new UpdateSessionCommand({
        uuid: updateSessionInputDto.uuid,
        sessionClosedType: updateSessionInputDto.sessionClosedType,
        loggedOutAt: updateSessionInputDto.loggedOutAt,
        refreshToken: updateSessionInputDto.refreshToken,
        failedAttempts: updateSessionInputDto.failedAttempts,
      }),
    );
  }
}
