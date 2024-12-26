export class ArchiveUserOutputDto {
  public readonly uuid: string;
  public readonly archivedAt: Date;

  constructor(root: ArchiveUserOutputDto) {
    this.uuid = root.uuid;
    this.archivedAt = root.archivedAt;
  }
}
