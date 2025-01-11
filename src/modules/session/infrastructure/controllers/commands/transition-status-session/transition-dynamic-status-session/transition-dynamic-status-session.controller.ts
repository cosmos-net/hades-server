import { BadRequestException, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { GetSessionQuery } from '@session/application/use-cases/queries/get-session/get-session.query';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { SessionModel } from '@session/domain/models/session.model';
import { TransitionDynamicStatusSessionInputDto } from '@session/infrastructure/controllers/commands/transition-status-session/transition-dynamic-status-session/transition-dynamic-status-session.input.dto';
import { TransitionDynamicStatusSessionOutputDto } from '@session/infrastructure/controllers/commands/transition-status-session/transition-dynamic-status-session/transition-dynamic-status-session.output.dto';

@Controller()
export class TransitionDynamicStatusSessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.TRANSITION_STATUS })
  async activateInvalidSession(
    @Payload() activateInactivateSessionInputDto: TransitionDynamicStatusSessionInputDto,
  ): Promise<TransitionDynamicStatusSessionOutputDto> {
    try {
      const { uuid, transitionStatus: toStatus } = activateInactivateSessionInputDto;
      const { ACTIVE, INACTIVE, PENDING } = SessionStatusEnum;

      let sessionModel = await this.queryBus.execute<GetSessionQuery, SessionModel>(
        new GetSessionQuery({
          uuid,
          withArchived: false,
        }),
      );

      const { status: fromStatus } = sessionModel;

      switch (fromStatus) {
        case ACTIVE:
          sessionModel = await this.handleActiveStatus(uuid, toStatus);
          break;
        case INACTIVE:
          sessionModel = await this.handleInactiveStatus(uuid, toStatus);
          break;
        case PENDING:
          if (toStatus === ACTIVE) {
            sessionModel = await this.commandBus.execute<
              ActivatePendingSessionCommand,
              SessionModel
            >(new ActivatePendingSessionCommand(uuid));
          } else {
            throw new BadRequestException(`Invalid transition from ${fromStatus} to ${toStatus}`);
          }
          break;
        default:
          throw new BadRequestException(`Invalid transition from ${fromStatus} to ${toStatus}`);
      }

      return new TransitionDynamicStatusSessionOutputDto(
        sessionModel,
        `Session transitioned from ${fromStatus} to ${toStatus}`,
      );
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

    throw new BadRequestException(`Invalid transition from ACTIVE to ${toStatus.toUpperCase()}`);
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

    throw new BadRequestException(`Invalid transition from INACTIVE to ${toStatus.toUpperCase()}`);
  }
}
