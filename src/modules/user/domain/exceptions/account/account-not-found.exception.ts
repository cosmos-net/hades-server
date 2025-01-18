import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class AccountNotFoundException extends ResourceNotFoundDomainException {
  public static readonly ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: AccountNotFoundException.ACCOUNT_NOT_FOUND,
        message,
      }),
    );
  }
}
