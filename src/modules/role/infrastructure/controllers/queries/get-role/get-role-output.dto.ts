export class GetRoleOutputDto {
  public readonly id?: number;
  public readonly uuid: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly archivedAt?: Date;

  constructor(root: GetRoleOutputDto) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.name = root.name;
    this.description = root.description;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
    this.archivedAt = root.archivedAt;
  }
}
