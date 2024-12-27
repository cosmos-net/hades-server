import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { DestroyUserCommand } from '@user/application/commands/use-cases/destroy-user/destroy-user.command';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { DestroyUserInputDto } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user-input.dto';
import { DestroyUserOutputDto } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user-output.dto';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

@Controller()
export class DestroyUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.ARCHIVE })
  async archive(@Payload() destroyUserDto: DestroyUserInputDto): Promise<DestroyUserOutputDto> {
    try {
      const result = await this.commandBus.execute<DestroyUserCommand, UserAggregate>(new DestroyUserCommand({ uuid: destroyUserDto.uuid }));

      return new DestroyUserOutputDto(result);
    }
    catch (error: any) {
      throw new RpcException(error);
    }
  }
}
