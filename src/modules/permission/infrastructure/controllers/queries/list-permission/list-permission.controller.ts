import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListPermissionQuery } from '@permission/application/use-cases/queries/list-permission/list-permission.query';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { ListPermissionInputDto } from '@permission/infrastructure/controllers/queries/list-permission/list-permission-input.dto';
import { ListPermissionOutputDto } from '@permission/infrastructure/controllers/queries/list-permission/list-permission-output.dto';
import { ListPermissionFilter } from '@permission/infrastructure/controllers/queries/list-permission/list-permission.filter-dto';

@Controller()
export class ListPermissionController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.LIST })
  async list(
    @Payload() listPermissionDto: ListPermissionInputDto,
  ): Promise<ListPermissionOutputDto> {
    try {
      const { orderType, orderBy, page, limit, offset, withArchived } = listPermissionDto;
      const filtersMap = ListPermissionFilter.toFilterMap(listPermissionDto);

      const result = await this.queryBus.execute<ListPermissionQuery, ListPermissionModel>(
        new ListPermissionQuery({
          orderType,
          orderBy,
          limit,
          offset,
          withArchived,
          filtersMap,
        }),
      );

      return new ListPermissionOutputDto(result.getItems, page, limit, result.getTotal);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
