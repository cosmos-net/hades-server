import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListRoleQuery } from '@role/application/queries/list-role/list-role.query';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { ListRoleInputDto } from '@role/infrastructure/controllers/queries/list-role/list-role-input.dto';
import { ListRoleOutputDto } from '@role/infrastructure/controllers/queries/list-role/list-role-output.dto';

@Controller()
export class ListRoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ROLE.LIST })
  async list(@Payload() listRoleDto: ListRoleInputDto): Promise<ListRoleOutputDto> {
    try {
      const { orderType, orderBy, page, limit, offset } = listRoleDto;
      const filtersMap = listRoleDto.toFilterMap();

      const result = await this.queryBus.execute<ListRoleQuery, ListRoleModel>(
        new ListRoleQuery({
          orderType,
          orderBy,
          limit,
          offset,
          filtersMap,
        }),
      );

      return new ListRoleOutputDto(result.getItems, page, limit, result.getTotal);
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
