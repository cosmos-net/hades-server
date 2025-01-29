import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { ArchiveAssignmentCommand } from '@assignment/application/use-cases/commands/archive-assignment/archive-assignment.command';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { ArchiveAssignmentInputDto } from '@assignment/infrastructure/controllers/commands/archive-assignment/archive-assignment-input.dto';
import { ArchiveAssignmentOutputDto } from '@assignment/infrastructure/controllers/commands/archive-assignment/archive-assignment-output.dto';
import { CMDS_HADES } from '@common/infrastructure/controllers/constants';

@Controller()
export class ArchiveAssignmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.ARCHIVE_BY_UUID })
  async archiveAssignment(
    @Payload() archiveAssignmentDto: ArchiveAssignmentInputDto,
  ): Promise<ArchiveAssignmentOutputDto> {
    try {
      const result = await this.commandBus.execute<ArchiveAssignmentCommand, AssignmentModel>(
        new ArchiveAssignmentCommand({ ...archiveAssignmentDto }),
      );

      return new ArchiveAssignmentOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
