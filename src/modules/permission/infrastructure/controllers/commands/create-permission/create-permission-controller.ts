import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreatePermissionCommand } from '@permission/application/use-cases/commands/create-permission/create-permission.command';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { CreatePermissionInputDto } from '@permission/infrastructure/controllers/commands/create-permission/create-permission-input.dto';
import { CreatePermissionOutputDto } from '@permission/infrastructure/controllers/commands/create-permission/create-permission-output.dto';

@Controller()
export class CreatePermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.PERMISSION.CREATE })
  async createPermission(dto: CreatePermissionInputDto): Promise<CreatePermissionOutputDto> {
    try {
      const uuid = uuidv4();

      const result = await this.commandBus.execute<CreatePermissionCommand, PermissionModel>(
        new CreatePermissionCommand({ ...dto, uuid }),
      );

      return new CreatePermissionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
