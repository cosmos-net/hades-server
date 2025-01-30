import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { DestroyAssignmentCommand } from '@assignment/application/use-cases/commands/destroy-assignment/destroy-assignment.command';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { DestroyAssignmentInputDto } from '@assignment/infrastructure/controllers/commands/destroy-assignment/destroy-assignment-input.dto';
import { DestroyAssignmentOutputDto } from '@assignment/infrastructure/controllers/commands/destroy-assignment/destroy-assignment-output.dto';
import { CMDS_HADES } from '@common/infrastructure/controllers/constants';

@Controller()
export class DestroyAssignmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.DESTROY })
  async destroyAssignment(
    @Payload() destroyAssignmentDto: DestroyAssignmentInputDto,
  ): Promise<DestroyAssignmentOutputDto> {
    try {
      const result = await this.commandBus.execute<DestroyAssignmentCommand, AssignmentModel>(
        new DestroyAssignmentCommand({ ...destroyAssignmentDto }),
      );

      return new DestroyAssignmentOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
