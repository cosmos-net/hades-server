import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DestroyUserCommand } from '@user/application/commands/use-cases/destroy-user/destroy-user.command';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroyUserInputDto } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user-input.dto';
import { DestroyUserOutputDto } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user-output.dto';

@Controller()
export class DestroyUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.ARCHIVE })
  async archive(@Payload() destroyUserDto: DestroyUserInputDto): Promise<DestroyUserOutputDto> {
    return this.commandBus.execute(new DestroyUserCommand({ uuid: destroyUserDto.uuid }));
  }
}
