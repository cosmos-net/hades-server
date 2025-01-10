import { ICommand } from '@nestjs/cqrs';

import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class InactivateActiveSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly status = SessionStatusEnum.INACTIVE;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
