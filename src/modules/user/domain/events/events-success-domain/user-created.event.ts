export class UserCreatedEvent {
  constructor(
    public readonly uuid: string,
    public readonly status: string,
  ) {}
}
