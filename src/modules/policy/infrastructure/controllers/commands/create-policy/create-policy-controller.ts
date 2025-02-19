import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreatePolicyCommand } from '@policy/application/use-cases/commands/create-policy/create-policy.command';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { CreatePolicyInputDto } from '@policy/infrastructure/controllers/commands/create-policy/create-policy-input.dto';
import { CreatePolicyOutputDto } from '@policy/infrastructure/controllers/commands/create-policy/create-policy-output.dto';

@Controller()
export class CreatePolicyController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.POLICY.CREATE })
  async createPolicy(dto: CreatePolicyInputDto): Promise<CreatePolicyOutputDto> {
    try {
      const uuid = uuidv4();

      const result = await this.commandBus.execute<CreatePolicyCommand, PolicyModel>(
        new CreatePolicyCommand({ ...dto, uuid }),
      );

      return new CreatePolicyOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
