import { ICommand } from '@nestjs/cqrs';

import { UserStatusEnum } from '@common/domain/enums/user-status-enum';

export class GetUserQuery implements ICommand {
  public readonly uuid: string;
  public readonly withArchived: boolean;
  public readonly failIfArchived?: boolean = false;
  public readonly status?: UserStatusEnum;

  constructor(root: GetUserQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
    this.failIfArchived = root.failIfArchived;
    this.status = root.status;
  }
}
