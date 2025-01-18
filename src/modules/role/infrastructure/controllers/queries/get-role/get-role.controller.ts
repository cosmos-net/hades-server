import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetRoleQuery } from '@role/application/use-cases/queries/get-role/get-role.query';
import { RoleModel } from '@role/domain/models/role.model';
import { GetRoleInputDto } from '@role/infrastructure/controllers/queries/get-role/get-role-input.dto';
import { GetRoleOutputDto } from '@role/infrastructure/controllers/queries/get-role/get-role-output.dto';

@Controller()
export class GetRoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.GET })
  async get(@Payload() getRoleInputDto: GetRoleInputDto): Promise<GetRoleOutputDto> {
    try {
      const result = await this.queryBus.execute<GetRoleQuery, RoleModel>(
        new GetRoleQuery(getRoleInputDto),
      );

      return new GetRoleOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
