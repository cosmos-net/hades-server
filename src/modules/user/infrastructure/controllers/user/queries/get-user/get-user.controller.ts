import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetUserQuery } from '@user/application/query/use-cases/get-rol/get-user.query';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetUserInputDto } from '@user/infrastructure/controllers/user/queries/get-user/get-user-input.dto';
import { GetUserOutputDto } from '@user/infrastructure/controllers/user/queries/get-user/get-user-output.dto';

@Controller()
export class GetUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.GET })
  async get(@Payload() getUserInputDto: GetUserInputDto): Promise<GetUserOutputDto> {
    return this.queryBus.execute(new GetUserQuery(getUserInputDto));
  }
}
