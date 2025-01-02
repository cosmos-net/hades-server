import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class AccountConfirmationPasswordException extends BusinessConflictDomainException {
  public static readonly ACCOUNT_CONFIRMATION_PASSWORD = 'ACCOUNT_CONFIRMATION_PASSWORD';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: AccountConfirmationPasswordException.ACCOUNT_CONFIRMATION_PASSWORD,
        message,
      }),
    );
  }
}
