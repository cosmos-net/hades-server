import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UpdateUserCommand } from '@user/application/commands/use-cases/update-user/update-user.command';
import { UpdateUserInput } from '@user/infrastructure/controllers/user/commands/update-user/update-user-input.dto';
import { UpdateUserOutputDto } from '@user/infrastructure/controllers/user/commands/update-user/update-user-output.dto';

@Controller()
export class UpdateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.UPDATE })
  async update(@Payload() updateUserInputDto: UpdateUserInput): Promise<UpdateUserOutputDto> {
    return this.commandBus.execute(
      new UpdateUserCommand({
        uuid: updateUserInputDto.uuid,
        accounts: updateUserInputDto.account,
        profile: updateUserInputDto.profile,
      }),
    );
  }
}
