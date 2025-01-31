import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { ListAssignmentQuery } from '@assignment/application/use-cases/queries/list-assignment/list-assignment.query';
import { ListAssignmentModel } from '@assignment/domain/models/assignment-list.model';
import { ListAssignmentInputDto } from '@assignment/infrastructure/controllers/queries/list-assignment/list-assignment-input.dto';
import { ListAssignmentOutputDto } from '@assignment/infrastructure/controllers/queries/list-assignment/list-assignment-output.dto';
import { ListAssignmentFilter } from '@assignment/infrastructure/controllers/queries/list-assignment/list-assignment.filter-dto';
import { CMDS_HADES } from '@common/infrastructure/controllers/constants';

@Controller()
export class ListAssignmentController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.LIST })
  async list(
    @Payload() listAssignmentDto: ListAssignmentInputDto,
  ): Promise<ListAssignmentOutputDto> {
    try {
      const { orderType, orderBy, page, limit, offset, withArchived } = listAssignmentDto;
      const filtersMap = ListAssignmentFilter.toFilterMap(listAssignmentDto);

      const result = await this.queryBus.execute<ListAssignmentQuery, ListAssignmentModel>(
        new ListAssignmentQuery({
          orderType,
          orderBy,
          limit,
          offset,
          withArchived,
          filtersMap,
        }),
      );

      return new ListAssignmentOutputDto(result.getItems, page, limit, result.getTotal);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
