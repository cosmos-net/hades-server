export class UserArchivedEvent {
  constructor(
    public readonly uuid: string,
    public readonly deletedAt: Date,
  ) {}
}
