import { BadRequestException, Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CloseActiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-active/close-active-session/close-active-session.command';
import { ExpireActiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-active/expire-active-session/expire-active-session.command';
import { InactivateActiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-active/inactivate-active-session/inactivate-active-session.command';
import { SuspendActiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-active/suspend-active-session/suspend-active-session.command';
import { ActivateInactiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-inactive/activate-inactive-session/activate-inactive-session.command';
import { CloseInactiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-inactive/close-inactive-session/close-inactive-session.command';
import { ExpireInactiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-inactive/expire-inactive-session/expire-inactive-session.command';
import { SuspendInactiveSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-inactive/suspend-inactive-session/suspend-inactive-session.command';
import { ActivatePendingSessionCommand } from '@session/application/use-cases/commands/transition-status-session/from-pending/activate-pending-session/activate-pending-session.command';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionModel } from '@session/domain/models/session.model';
import { TransitionDynamicStatusSessionInputDto } from '@session/infrastructure/controllers/commands/transition-status-session/transition-dynamic-status-session/transition-dynamic-status-session.input.dto';
import { TransitionDynamicStatusSessionOutputDto } from '@session/infrastructure/controllers/commands/transition-status-session/transition-dynamic-status-session/transition-dynamic-status-session.output.dto';

@Controller()
export class TransitionDynamicStatusSessionController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.TRANSITION_STATUS })
  async activateInvalidSession(
    @Payload() activateInactivateSessionInputDto: TransitionDynamicStatusSessionInputDto,
  ): Promise<TransitionDynamicStatusSessionOutputDto> {
    try {
      const { uuid, from: fromStatus, to: toStatus } = activateInactivateSessionInputDto;
      const { ACTIVE, INACTIVE, PENDING } = SessionStatusEnum;

      let result: SessionModel;

      if (fromStatus === ACTIVE) {
        result = await this.handleActiveStatus(uuid, toStatus);
      } else if (fromStatus === INACTIVE) {
        result = await this.handleInactiveStatus(uuid, toStatus);
      } else if (fromStatus === PENDING && toStatus === ACTIVE) {
        result = await this.commandBus.execute<ActivatePendingSessionCommand, SessionModel>(
          new ActivatePendingSessionCommand(uuid),
        );
      } else throw new BadRequestException('Invalid transition');

      return new TransitionDynamicStatusSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }

  private async handleActiveStatus(
    uuid: string,
    toStatus: SessionStatusEnum,
  ): Promise<SessionModel> {
    const { CLOSED, EXPIRED, INACTIVE, SUSPENDED } = SessionStatusEnum;

    if (toStatus === CLOSED) {
      const result = await this.commandBus.execute<CloseActiveSessionCommand, SessionModel>(
        new CloseActiveSessionCommand(uuid),
      );

      return result;
    }

    if (toStatus === EXPIRED) {
      const result = await this.commandBus.execute<ExpireActiveSessionCommand, SessionModel>(
        new ExpireActiveSessionCommand(uuid),
      );

      return result;
    }

    if (toStatus === INACTIVE) {
      const result = await this.commandBus.execute<InactivateActiveSessionCommand, SessionModel>(
        new InactivateActiveSessionCommand(uuid),
      );

      return result;
    }

    if (toStatus === SUSPENDED) {
      const result = await this.commandBus.execute<SuspendActiveSessionCommand, SessionModel>(
        new SuspendActiveSessionCommand(uuid),
      );

      return result;
    }

    throw new BadRequestException('Invalid transition');
  }

  private async handleInactiveStatus(
    uuid: string,
    toStatus: SessionStatusEnum,
  ): Promise<SessionModel> {
    const { ACTIVE, CLOSED, EXPIRED, SUSPENDED } = SessionStatusEnum;

    if (toStatus === ACTIVE) {
      const result = await this.commandBus.execute<ActivateInactiveSessionCommand, SessionModel>(
        new ActivateInactiveSessionCommand(uuid),
      );

      return result;
    }

    if (toStatus === CLOSED) {
      const result = await this.commandBus.execute<CloseInactiveSessionCommand, SessionModel>(
        new CloseInactiveSessionCommand(uuid),
      );

      return result;
    }

    if (toStatus === EXPIRED) {
      const result = await this.commandBus.execute<ExpireInactiveSessionCommand, SessionModel>(
        new ExpireInactiveSessionCommand(uuid),
      );

      return result;
    }

    if (toStatus === SUSPENDED) {
      const result = await this.commandBus.execute<SuspendInactiveSessionCommand, SessionModel>(
        new SuspendInactiveSessionCommand(uuid),
      );

      return result;
    }

    throw new BadRequestException('Invalid transition');
  }
}
