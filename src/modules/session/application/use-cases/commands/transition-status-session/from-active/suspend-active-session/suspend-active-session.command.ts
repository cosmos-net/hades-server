import { ICommand } from '@nestjs/cqrs';

import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class SuspendActiveSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly status = SessionStatusEnum.CLOSED;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
