import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PolicyIsNotArchiveException extends BusinessConflictDomainException {
  public static readonly POLICY_IN_NOT_ARCHIVE = 'POLICY_IN_NOT_ARCHIVE';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: PolicyIsNotArchiveException.POLICY_IN_NOT_ARCHIVE, message }));
  }
}
