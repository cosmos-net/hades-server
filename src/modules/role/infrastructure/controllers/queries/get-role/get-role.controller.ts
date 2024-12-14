import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetRoleQuery } from '@role/application/queries/get-role/get-role.query';
import { GetRoleInputDto } from '@role/infrastructure/controllers/queries/get-role/get-role-input.dto';
import { GetRoleOutputDto } from '@role/infrastructure/controllers/queries/get-role/get-role-output.dto';

@Controller()
export class GetRoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.GET })
  async get(@Payload() getRoleInputDto: GetRoleInputDto): Promise<GetRoleOutputDto> {
    return this.queryBus.execute(new GetRoleQuery(getRoleInputDto));
  }
}
