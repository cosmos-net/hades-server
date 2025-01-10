import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreateSessionCommand } from '@session/application/use-cases/commands/create-session/create-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { CreateSessionInput } from '@session/infrastructure/controllers/commands/create-session/create-session-input.dto';
import { CreateSessionOutputDto } from '@session/infrastructure/controllers/commands/create-session/create-session-output.dto';

@Controller()
export class CreateSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.CREATE })
  async create(@Payload() createSessionDto: CreateSessionInput): Promise<CreateSessionOutputDto> {
    try {
      const uuid = UUIDv4();
      const result = await this.commandBus.execute<CreateSessionCommand, SessionModel>(
        new CreateSessionCommand({ ...createSessionDto, uuid }),
      );

      return new CreateSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
