import ValidationDomainException from '@common/domain/exceptions/validation.exception';

export class RoleNameException extends ValidationDomainException {
  public static readonly INVALID_ROLE_NAME = 'Invalid role name';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({ name: RoleNameException.INVALID_ROLE_NAME, message }),
    );
  }
}
