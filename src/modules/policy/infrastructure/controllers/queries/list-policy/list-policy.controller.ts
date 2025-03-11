import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListPolicyQuery } from '@policy/application/use-cases/queries/list-policy/list-policy.query';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';
import { ListPolicyInputDto } from '@policy/infrastructure/controllers/queries/list-policy/list-policy-input.dto';
import { ListPolicyOutputDto } from '@policy/infrastructure/controllers/queries/list-policy/list-policy-output.dto';

@Controller()
export class ListPolicyController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.POLICY.LIST })
  async list(@Payload() listPolicyDto: ListPolicyInputDto): Promise<ListPolicyOutputDto> {
    try {
      const { orderType, orderBy, page, limit, offset, withArchived, ...params } = listPolicyDto;

      const result = await this.queryBus.execute<ListPolicyQuery, ListPolicyModel>(
        new ListPolicyQuery({
          orderType,
          orderBy,
          limit,
          offset,
          withArchived,
          params,
        }),
      );

      return new ListPolicyOutputDto(result.getItemsPrimitives, page, limit, result.getTotal);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
