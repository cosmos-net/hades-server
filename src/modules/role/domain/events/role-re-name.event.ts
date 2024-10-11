export class RoleReNameEvent {
  constructor(
    public readonly roleUUID: string,
    public readonly nme: string,
  ) {}
}
