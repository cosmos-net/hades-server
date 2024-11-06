import ValidationDomainException from '@common/domain/exceptions/validation.exception';

export class RoleNotFoundException extends ValidationDomainException {
  public static readonly ROLE_NOT_FOUND = 'ROLE_NOT_FOUND';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: RoleNotFoundException.ROLE_NOT_FOUND,
        message,
      }),
    );
  }
}
