import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class UserNotFoundException extends ResourceNotFoundDomainException {
  public static readonly USER_NOT_FOUND = 'USER_NOT_FOUND';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: UserNotFoundException.USER_NOT_FOUND,
        message,
      }),
    );
  }
}
