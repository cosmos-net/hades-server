import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreateActiveSessionCommand } from '@session/application/commands/use-cases/create-active-session/create-active-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { CreateActiveSessionInput } from '@session/infrastructure/controllers/commands/create-session/create-active-session-input.dto';
import { CreateActiveSessionOutputDto } from '@session/infrastructure/controllers/commands/create-session/create-active-session-output.dto';

@Controller()
export class CreateActiveSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.CREATE_ACTIVE })
  async create(
    @Payload() createActiveSessionDto: CreateActiveSessionInput,
  ): Promise<CreateActiveSessionOutputDto> {
    try {
      const uuid = UUIDv4();
      const result = await this.commandBus.execute<CreateActiveSessionCommand, SessionModel>(
        new CreateActiveSessionCommand({ ...createActiveSessionDto, uuid }),
      );

      return new CreateActiveSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
