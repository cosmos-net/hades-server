import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class UserNotArchivedException extends BusinessConflictDomainException {
  public static readonly USER_NOT_ARCHIVED = 'USER_NOT_ARCHIVED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: UserNotArchivedException.USER_NOT_ARCHIVED,
        message,
      }),
    );
  }
}
