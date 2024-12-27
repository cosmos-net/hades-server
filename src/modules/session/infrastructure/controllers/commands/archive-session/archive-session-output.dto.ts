export class ArchiveSessionOutputDto {
  public readonly uuid: string;
  public readonly archivedAt: Date;

  constructor(root: ArchiveSessionOutputDto) {
    this.uuid = root.uuid;
    this.archivedAt = root.archivedAt;
  }
}
