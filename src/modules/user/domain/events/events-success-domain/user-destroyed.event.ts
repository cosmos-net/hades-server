export class UserDestroyedEvent {
  constructor(
    public readonly uuid: string,
    public readonly deletedAt: Date,
  ) {}
}
