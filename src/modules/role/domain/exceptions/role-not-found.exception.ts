import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class RoleNotFoundException extends ResourceNotFoundDomainException {
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
