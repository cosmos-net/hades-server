import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { UnarchivePolicyInputDto } from '@policy/infrastructure/controllers/commands/unarchive-policy/unarchive-policy-input.dto';
import { UnarchivePolicyOutputDto } from '@policy/infrastructure/controllers/commands/unarchive-policy/unarchive-policy-output.dto';
import { PolicyUnarchiverProgramCommand } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-unarchiver-program/policy-unarchiver-program.command';

@Controller()
export class UnarchivePolicyController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.POLICY.UNARCHIVE })
  async unarchivePolicy(
    @Payload() unarchivePolicyDto: UnarchivePolicyInputDto,
  ): Promise<UnarchivePolicyOutputDto> {
    try {
      const result = await this.commandBus.execute<PolicyUnarchiverProgramCommand, PolicyModel>(
        new PolicyUnarchiverProgramCommand(unarchivePolicyDto.uuid),
      );

      return new UnarchivePolicyOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
