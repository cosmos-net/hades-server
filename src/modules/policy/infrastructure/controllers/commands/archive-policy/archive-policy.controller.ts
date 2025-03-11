import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { ArchivePolicyInputDto } from '@policy/infrastructure/controllers/commands/archive-policy//archive-policy-input.dto';
import { ArchivePolicyOutputDto } from '@policy/infrastructure/controllers/commands/archive-policy/archive-policy-output.dto';
import { PolicyArchiverProgramCommand } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-archiver-program/policy-archiver-program.command';

@Controller()
export class ArchivePolicyController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.POLICY.ARCHIVE })
  async archivePolicy(
    @Payload() archivePolicyDto: ArchivePolicyInputDto,
  ): Promise<ArchivePolicyOutputDto> {
    try {
      const result = await this.commandBus.execute<PolicyArchiverProgramCommand, PolicyModel>(
        new PolicyArchiverProgramCommand(archivePolicyDto.uuid),
      );

      return new ArchivePolicyOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
