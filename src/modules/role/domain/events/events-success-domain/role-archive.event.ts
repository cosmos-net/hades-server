export class RoleArchiveEvent {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
    public readonly deletedAt: Date,
  ) {}
}
