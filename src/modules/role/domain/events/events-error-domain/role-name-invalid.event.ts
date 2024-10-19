export class RoleNameInvalidEvent {
  constructor(
    public readonly message: string,
    public readonly errorCode: string,
  ) {}
}
