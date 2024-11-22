import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ListUserQuery } from '@user/application/queries/list-user/list-user.query';
import { ListUserModel } from '@user/domain/models/user-list.model';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListUserInputDto } from '@user/infrastructure/controllers/user/queries/list-user/list-user-input.dto';
import { ListUserOutputDto } from '@user/infrastructure/controllers/user/queries/list-user/list-user-output.dto';

@Controller()
export class ListUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.LIST })
  async list(@Payload() listUserDto: ListUserInputDto): Promise<ListUserOutputDto> {
    const { orderType, orderBy, page, limit, offset } = listUserDto;
    const filtersMap = listUserDto.toFilterMap();

    const result = await this.queryBus.execute<ListUserQuery, ListUserModel>(
      new ListUserQuery({
        orderType,
        orderBy,
        limit,
        offset,
        filtersMap,
      }),
    );

    return new ListUserOutputDto(result.getItems, page, limit, result.getTotal);
  }
}
