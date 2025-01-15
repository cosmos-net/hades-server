import { ICommand } from '@nestjs/cqrs';

import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class SuspendInactiveSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly status = SessionStatusEnum.SUSPENDED;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
