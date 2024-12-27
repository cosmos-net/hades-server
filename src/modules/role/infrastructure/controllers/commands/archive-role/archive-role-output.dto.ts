export class ArchiveRoleOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly name: string;
  public readonly archivedAt: Date;

  constructor(root: ArchiveRoleOutputDto) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.name = root.name;
    this.archivedAt = root.archivedAt;
  }
}
