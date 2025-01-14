import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { IncrementFailedAttemptsSessionCommand } from '@session/application/use-cases/commands/increment-failed-attempts-session/increment-failed-attempts-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { IncrementFailedAttemptsSessionInputDto } from '@session/infrastructure/controllers/commands/increment-failed-attempts-session/increment-failed-attempts-session-input.dto';
import { IncrementFailedAttemptsSessionOutputDto } from '@session/infrastructure/controllers/commands/increment-failed-attempts-session/increment-failed-attempts-session-output.dto';

@Controller()
export class IncrementFailedAttemptsSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.INCREMENT_FAILED_ATTEMPTS })
  async incrementFailedAttemptsSession(
    @Payload() incrementFailedAttemptsSessionInputDto: IncrementFailedAttemptsSessionInputDto,
  ): Promise<IncrementFailedAttemptsSessionOutputDto> {
    const result = await this.commandBus.execute<
      IncrementFailedAttemptsSessionCommand,
      SessionModel
    >(
      new IncrementFailedAttemptsSessionCommand({
        uuid: incrementFailedAttemptsSessionInputDto.uuid,
      }),
    );

    return new IncrementFailedAttemptsSessionOutputDto(result);
  }
}
