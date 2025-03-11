import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PolicyIsSamePropertyException extends BusinessConflictDomainException {
  public static readonly POLICY_IS_SAME_PROPERTY = 'POLICY_IS_SAME_PROPERTY';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PolicyIsSamePropertyException.POLICY_IS_SAME_PROPERTY,
        message,
      }),
    );
  }
}
