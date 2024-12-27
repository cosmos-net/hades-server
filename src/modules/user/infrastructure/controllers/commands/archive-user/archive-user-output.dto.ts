import { UserAggregate } from "@user/domain/aggregates/user.aggregate";

export class ArchiveUserOutputDto {
  public readonly uuid: string;
  public readonly archivedAt: Date;

  constructor(root: UserAggregate) {
    this.uuid = root.userModel.uuid;
    this.archivedAt = root.userModel.archivedAt;
  }
}
