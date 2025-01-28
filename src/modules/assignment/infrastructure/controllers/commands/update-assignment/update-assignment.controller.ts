import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { UpdateAssignmentCommand } from '@assignment/application/use-cases/commands/update-assignment/update-assignment.command';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { UpdateAssignmentInput } from '@assignment/infrastructure/controllers/commands/update-assignment/update-assignment-input.dto';
import { UpdateAssignmentOutputDto } from '@assignment/infrastructure/controllers/commands/update-assignment/update-assignment-output.dto';
import { CMDS_HADES } from '@common/infrastructure/controllers/constants';

@Controller()
export class UpdateAssignmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.UPDATE })
  async updateAssignment(
    @Payload() updateAssignmentDto: UpdateAssignmentInput,
  ): Promise<UpdateAssignmentOutputDto> {
    try {
      const result = await this.commandBus.execute<UpdateAssignmentCommand, AssignmentModel>(
        new UpdateAssignmentCommand({ ...updateAssignmentDto }),
      );

      return new UpdateAssignmentOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
