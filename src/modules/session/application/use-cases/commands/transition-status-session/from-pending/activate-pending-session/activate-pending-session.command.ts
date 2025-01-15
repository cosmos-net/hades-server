import { ICommand } from '@nestjs/cqrs';

import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class ActivatePendingSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly status = SessionStatusEnum.ACTIVE;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
