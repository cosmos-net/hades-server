export class RoleCreatedEvent {
  constructor(
    public readonly uuid: string,
    public readonly name: string,
  ) {}
}
