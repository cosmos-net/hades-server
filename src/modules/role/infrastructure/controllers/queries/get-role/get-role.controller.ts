import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetRoleQuery } from '@role/application/queries/get-role/get-role.query';
import { GetRoleInputDto } from '@role/infrastructure/controllers/queries/get-role/get-role-input.dto';
import { GetRoleOutputDto } from '@role/infrastructure/controllers/queries/get-role/get-role-output.dto';
import { RoleModel } from '@role/domain/models/role.model';

@Controller()
export class GetRoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.GET })
  async get(@Payload() getRoleInputDto: GetRoleInputDto): Promise<GetRoleOutputDto> {
    try {
    const result = await this.queryBus.execute<GetRoleQuery, RoleModel>(new GetRoleQuery(getRoleInputDto));

    return new GetRoleOutputDto(result);
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
