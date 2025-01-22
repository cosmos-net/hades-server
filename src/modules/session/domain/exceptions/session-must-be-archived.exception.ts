import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class SessionMustBeArchivedException extends BusinessConflictDomainException {
  public static readonly SESSION_MUST_BE_ARCHIVED = 'SESSION_MUST_BE_ARCHIVED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({ name: SessionMustBeArchivedException.SESSION_MUST_BE_ARCHIVED, message }),
    );
  }
}
