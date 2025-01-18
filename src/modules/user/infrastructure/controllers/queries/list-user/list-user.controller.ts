import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListUserQuery } from '@user/application/use-cases/queries/list-user/list-user.query';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { ListUserInputDto } from '@user/infrastructure/controllers/queries/list-user/list-user-input.dto';
import { ListUserOutputDto } from '@user/infrastructure/controllers/queries/list-user/list-user-output.dto';
import { ListUserFilter } from '@user/infrastructure/controllers/queries/list-user/list-user.filter-dto';

@Controller()
export class ListUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.LIST })
  async list(@Payload() listUserDto: ListUserInputDto): Promise<ListUserOutputDto> {
    try {
      const { orderType, orderBy, page, limit, offset, withArchived } = listUserDto;
      const filtersMap = ListUserFilter.toFilterMap(listUserDto);

      const result = await this.queryBus.execute<ListUserQuery, ListUserAggregate>(
        new ListUserQuery({
          orderType,
          orderBy,
          limit,
          offset,
          filtersMap,
          withArchived,
        }),
      );

      return new ListUserOutputDto(result, page, limit);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
