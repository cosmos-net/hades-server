export class UserArchivedEvent {
  constructor(
    public readonly uuid: string,
    public readonly archivedAt: Date,
  ) {}
}
