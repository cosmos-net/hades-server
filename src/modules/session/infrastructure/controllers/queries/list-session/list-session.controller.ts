import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListSessionInputDto } from './list-session-input.dto';
import { ListSessionOutputDto } from './list-session-output.dto';
import { ListSessionQuery } from '@session/application/queries/list-session/list-session.query';
import { ListSessionModel } from '@session/domain/models/session-list.model';

@Controller()
export class ListSessionController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.LIST })
  async list(@Payload() listSessionDto: ListSessionInputDto): Promise<ListSessionOutputDto> {
    try {
      const { orderType, orderBy, page, limit, offset, withArchived } = listSessionDto;
      const filtersMap = listSessionDto.toFilterMap();

      const result = await this.queryBus.execute<ListSessionQuery, ListSessionModel>(
        new ListSessionQuery({
          orderType,
          orderBy,
          limit,
          offset,
          withArchived,
          filtersMap,
        }),
      );

      return new ListSessionOutputDto(result.getItems, page, limit, result.getTotal);
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
