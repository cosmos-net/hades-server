import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { UserRoleAssignmentCommand } from '@assignment/application/use-cases/commands/user-role-assignment/user-role-assignment.command';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { UserRoleAssignmentInput } from '@assignment/infrastructure/controllers/commands/user-role-assignment/user-role-assignment-input.dto';
import { UserRoleAssignmentOutputDto } from '@assignment/infrastructure/controllers/commands/user-role-assignment/user-role-assignment-output.dto';
import { CMDS_HADES } from '@common/infrastructure/controllers/constants';

@Controller()
export class UserRoleAssignmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.ASSIGNMENT.CREATE })
  async createAssignment(
    @Payload() userRoleAssignmentDto: UserRoleAssignmentInput,
  ): Promise<UserRoleAssignmentOutputDto> {
    try {
      const uuid = UUIDv4();
      const result = await this.commandBus.execute<UserRoleAssignmentCommand, AssignmentModel>(
        new UserRoleAssignmentCommand({ ...userRoleAssignmentDto, uuid }),
      );

      return new UserRoleAssignmentOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
