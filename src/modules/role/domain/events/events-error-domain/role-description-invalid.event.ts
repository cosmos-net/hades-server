export class RoleDescriptionInvalidEvent {
  constructor(
    public readonly code: string,
    public readonly message: string,
  ) {}
}
