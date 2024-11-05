export class RoleReDescribedEvent {
  constructor(
    public readonly uuid: string,
    public readonly legacyDescription: string,
    public readonly currentDescription: string,
  ) {}
}
