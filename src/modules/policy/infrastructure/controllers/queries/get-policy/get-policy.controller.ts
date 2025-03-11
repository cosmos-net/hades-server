import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetPolicyQuery } from '@policy/application/use-cases/queries/get-policy/get-policy.query';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { GetPolicyInputDto } from '@policy/infrastructure/controllers/queries/get-policy/get-policy-input.dto';
import { GetPolicyOutputDto } from '@policy/infrastructure/controllers/queries/get-policy/get-policy-output.dto';

@Controller()
export class GetPolicyController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.POLICY.GET })
  async get(@Payload() getPolicyInputDto: GetPolicyInputDto): Promise<GetPolicyOutputDto> {
    try {
      const result = await this.queryBus.execute<GetPolicyQuery, PolicyModel>(
        new GetPolicyQuery(getPolicyInputDto),
      );

      return new GetPolicyOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
