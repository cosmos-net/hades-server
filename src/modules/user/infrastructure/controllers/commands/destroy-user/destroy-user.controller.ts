import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroyUserCommand } from '@user/application/commands/use-cases/destroy-user/destroy-user.command';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { DestroyUserInputDto } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user-input.dto';
import { DestroyUserOutputDto } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user-output.dto';

@Controller()
export class DestroyUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.DESTROY })
  async archive(@Payload() destroyUserDto: DestroyUserInputDto): Promise<DestroyUserOutputDto> {
    try {
      const result = await this.commandBus.execute<DestroyUserCommand, UserAggregate>(
        new DestroyUserCommand({ uuid: destroyUserDto.uuid }),
      );

      return new DestroyUserOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
