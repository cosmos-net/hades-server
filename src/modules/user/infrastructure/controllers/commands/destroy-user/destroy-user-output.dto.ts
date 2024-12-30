import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

export class DestroyUserOutputDto {
  public readonly uuid: string;
  public readonly destroyedAt: Date;

  constructor(root: UserAggregate) {
    this.uuid = root.userModel.uuid;
    this.destroyedAt = root.userModel.archivedAt;
  }
}
