import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class AccountArchivedException extends BusinessConflictDomainException {
  public static readonly ACCOUNT_ARCHIVED = 'ACCOUNT_ARCHIVED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: AccountArchivedException.ACCOUNT_ARCHIVED,
        message,
      }),
    );
  }
}
