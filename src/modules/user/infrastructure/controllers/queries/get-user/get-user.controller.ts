import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetUserQuery } from '@user/application/queries/use-cases/get-user/get-user.query';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { GetUserInputDto } from '@user/infrastructure/controllers/queries/get-user/get-user-input.dto';
import { GetUserOutputDto } from '@user/infrastructure/controllers/queries/get-user/get-user-output.dto';

@Controller()
export class GetUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.GET })
  async get(@Payload() getUserInputDto: GetUserInputDto): Promise<GetUserOutputDto> {
    try {
      const result = await this.queryBus.execute<GetUserQuery, UserAggregate>(
        new GetUserQuery(getUserInputDto),
      );

      return new GetUserOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
