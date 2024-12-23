export class DestroyUserOutputDto {
  public readonly uuid: string;
  public readonly archivedAt: Date;
  
  constructor(root: DestroyUserOutputDto) {
    this.uuid = root.uuid;
    this.archivedAt = root.archivedAt;
  }
}
