import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveUserCommand } from '@user/application/commands/use-cases/archive-user/archive-user.command';
import { ArchiveUserInputDto } from '@user/infrastructure/controllers/commands/archive-user/archive-user-input.dto';
import { ArchiveUserOutputDto } from '@user/infrastructure/controllers/commands/archive-user/archive-user-output.dto';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

@Controller()
export class ArchiveUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.ARCHIVE })
  async archive(@Payload() archiveUserDto: ArchiveUserInputDto): Promise<ArchiveUserOutputDto> {
    try {
      const result = await this.commandBus.execute<ArchiveUserCommand, UserAggregate>(new ArchiveUserCommand({ uuid: archiveUserDto.uuid }));

      return new ArchiveUserOutputDto(result);
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
