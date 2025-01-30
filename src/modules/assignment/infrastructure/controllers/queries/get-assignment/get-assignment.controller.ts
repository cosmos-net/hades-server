import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { GetAssignmentQuery } from '@assignment/application/use-cases/queries/get-assignment/get-assignment.query';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { GetAssignmentInputDto } from '@assignment/infrastructure/controllers/queries/get-assignment/get-assignment-input.dto';
import { GetAssignmentOutputDto } from '@assignment/infrastructure/controllers/queries/get-assignment/get-assignment-output.dto';
import { CMDS_HADES } from '@common/infrastructure/controllers/constants';

@Controller()
export class GetAssignmentController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.GET })
  async get(
    @Payload() getAssignmentInputDto: GetAssignmentInputDto,
  ): Promise<GetAssignmentOutputDto> {
    try {
      const result = await this.queryBus.execute<GetAssignmentQuery, AssignmentModel>(
        new GetAssignmentQuery(getAssignmentInputDto),
      );

      return new GetAssignmentOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
