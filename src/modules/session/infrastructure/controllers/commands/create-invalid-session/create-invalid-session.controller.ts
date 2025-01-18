import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreateInvalidSessionCommand } from '@session/application/use-cases/commands/create-invalid-session/create-invalid-session.command';
import { SessionModel } from '@session/domain/models/session.model';
import { CreateInvalidSessionInput } from '@session/infrastructure/controllers/commands/create-invalid-session/create-invalid-session-input.dto';
import { CreateInvalidSessionOutputDto } from '@session/infrastructure/controllers/commands/create-invalid-session/create-invalid-session-output.dto';

@Controller()
export class CreateInvalidSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.CREATE_INVALID })
  async create(
    @Payload() createInvalidSessionDto: CreateInvalidSessionInput,
  ): Promise<CreateInvalidSessionOutputDto> {
    try {
      const uuid = UUIDv4();
      const result = await this.commandBus.execute<CreateInvalidSessionCommand, SessionModel>(
        new CreateInvalidSessionCommand({ ...createInvalidSessionDto, uuid }),
      );

      return new CreateInvalidSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
