import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListSessionQuery } from '@session/application/use-cases/queries/list-session/list-session.query';
import { ListSessionModel } from '@session/domain/models/session-list.model';
import { ListSessionInputDto } from '@session/infrastructure/controllers/queries/list-session/list-session-input.dto';
import { ListSessionOutputDto } from '@session/infrastructure/controllers/queries/list-session/list-session-output.dto';

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
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
