export class UserDestroyedEvent {
  constructor(
    public readonly uuid: string,
    public readonly destroyedAt: Date,
  ) {}
}
