import ValidationDomainException from '@common/domain/exceptions/validation.exception';

export class RoleDescriptionException extends ValidationDomainException {
  public static readonly INVALID_ROLE_DESCRIPTION = 'Invalid role description';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: RoleDescriptionException.INVALID_ROLE_DESCRIPTION, message }));
  }
}
