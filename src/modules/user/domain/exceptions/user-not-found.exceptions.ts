import ValidationDomainException from '@common/domain/exceptions/validation.exception';

export class UserNotFoundException extends ValidationDomainException {
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
