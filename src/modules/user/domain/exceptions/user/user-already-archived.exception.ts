import DomainNotAllowedDomainException from '@common/domain/exceptions/domain-not-allowed.exception';

export class UserAlreadyArchivedException extends DomainNotAllowedDomainException {
  public static readonly USER_ALREADY_ARCHIVED = 'USER_ALREADY_ARCHIVED';

  constructor(message: string) {
    super(
      JSON.stringify({
        name: UserAlreadyArchivedException.USER_ALREADY_ARCHIVED,
        message,
      }),
    );
  }
}
