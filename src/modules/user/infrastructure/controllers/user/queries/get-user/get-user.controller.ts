import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetUserQuery } from '@user/application/queries/use-cases/get-user/get-user.query';
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
