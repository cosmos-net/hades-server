import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { UpdateUserCommand } from '@user/application/commands/use-cases/update-user/update-user.command';
import { UpdateUserInput } from '@user/infrastructure/controllers/commands/update-user/update-user-input.dto';
import { UpdateUserOutputDto } from '@user/infrastructure/controllers/commands/update-user/update-user-output.dto';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

@Controller()
export class UpdateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.UPDATE })
  async update(@Payload() updateUserInputDto: UpdateUserInput): Promise<UpdateUserOutputDto> {
    try {
      const result = await this.commandBus.execute<UpdateUserCommand, UserAggregate>(
        new UpdateUserCommand({
          uuid: updateUserInputDto.uuid,
          accounts: updateUserInputDto.accounts,
          profile: updateUserInputDto.profile,
        }),
      );

      return new UpdateUserOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
