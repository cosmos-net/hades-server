import { ICommand } from '@nestjs/cqrs';

import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';

export class ExpireActiveSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly status = SessionStatusEnum.EXPIRED;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
