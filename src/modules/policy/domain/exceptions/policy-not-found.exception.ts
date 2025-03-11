import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class PolicyNotFoundException extends ResourceNotFoundDomainException {
  public static readonly POLICY_NOT_FOUND = 'POLICY_NOT_FOUND';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PolicyNotFoundException.POLICY_NOT_FOUND,
        message,
      }),
    );
  }
}
