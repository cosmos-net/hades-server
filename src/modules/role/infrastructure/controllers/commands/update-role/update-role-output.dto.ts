export class UpdateRoleOutputDto {
  public readonly id: number;
  public readonly uuid: string;
  public readonly name: string;
  public readonly description: string;
  public readonly updatedAt: Date;

  constructor(root: UpdateRoleOutputDto) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.name = root.name;
    this.description = root.description;
    this.updatedAt = root.updatedAt;
  }
}
