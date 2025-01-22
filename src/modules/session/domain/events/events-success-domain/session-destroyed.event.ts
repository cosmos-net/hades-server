export class SessionDestroyedEvent {
  constructor(
    public readonly uuid: string,
    public readonly sessionId: string,
    public readonly destroyedAt: Date,
  ) {}
}
