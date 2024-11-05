export class RoleReNamedEvent {
  constructor(
    public readonly uuid: string,
    public readonly legacyName: string,
    public readonly currentName: string,
  ) {}
}
