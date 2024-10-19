export class CreateRoleCommand {
  public readonly uuid: string;
  public readonly name: string;
  public readonly description: string;

  constructor(root: CreateRoleCommand) {
    this.uuid = root.uuid;
    this.name = root.name;
    this.description = root.description;
  }
}
