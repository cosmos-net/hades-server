import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PolicyIsArchiveException extends BusinessConflictDomainException {
  public static readonly POLICY_ALREADY_ARCHIVE = 'POLICY_ALREADY_ARCHIVE';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: PolicyIsArchiveException.POLICY_ALREADY_ARCHIVE, message }));
  }
}
