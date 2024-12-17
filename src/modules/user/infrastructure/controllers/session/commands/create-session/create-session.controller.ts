import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreateSessionCommand } from '@user/application/commands/use-cases/session/create-session/create-session.command';
import { CreateSessionInput } from '@user/infrastructure/controllers/session/commands/create-session/create-session-input.dto';
import { CreateSessionOutputDto } from '@user/infrastructure/controllers/session/commands/create-session/create-session-output.dto';

@Controller()
export class CreateSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.CREATE })
  async create(@Payload() createSessionDto: CreateSessionInput): Promise<CreateSessionOutputDto> {
    const uuid = UUIDv4();

    return this.commandBus.execute(new CreateSessionCommand({ ...createSessionDto, uuid }));
  }
}
