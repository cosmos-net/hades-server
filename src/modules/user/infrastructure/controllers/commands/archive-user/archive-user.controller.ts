import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ArchiveUserCommand } from '@user/application/commands/use-cases/archive-user/archive-user.command';
import { ArchiveUserInputDto } from '@user/infrastructure/controllers/user/commands/archive-user/archive-user-input.dto';
import { ArchiveUserOutputDto } from '@user/infrastructure/controllers/user/commands/archive-user/archive-user-output.dto';

@Controller()
export class ArchiveUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.ARCHIVE })
  async archive(@Payload() archiveUserDto: ArchiveUserInputDto): Promise<ArchiveUserOutputDto> {
    return this.commandBus.execute(new ArchiveUserCommand({ uuid: archiveUserDto.uuid }));
  }
}
