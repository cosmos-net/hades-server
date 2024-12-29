import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class UserIsNotAvailableException extends BusinessConflictDomainException {
  public static readonly USER_IS_NOT_AVAILABLE = 'USER_IS_NOT_AVAILABLE';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: UserIsNotAvailableException.USER_IS_NOT_AVAILABLE,
        message,
      }),
    );
  }
}
