import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetPermissionQuery } from '@permission/application/use-cases/queries/get-permission/get-permission.query';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { GetPermissionInputDto } from '@permission/infrastructure/controllers/queries/get-permission/get-permission-input.dto';
import { GetPermissionOutputDto } from '@permission/infrastructure/controllers/queries/get-permission/get-permission-output.dto';

@Controller()
export class GetPermissionController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.PERMISSION.GET })
  async get(
    @Payload() getPermissionInputDto: GetPermissionInputDto,
  ): Promise<GetPermissionOutputDto> {
    try {
      const result = await this.queryBus.execute<GetPermissionQuery, PermissionModel>(
        new GetPermissionQuery(getPermissionInputDto),
      );

      return new GetPermissionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
