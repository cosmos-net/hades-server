import InvalidOperationDomainException from '@common/domain/exceptions/invalid-operation.exception';

export class SessionStatusNotChangedException extends InvalidOperationDomainException {
  public static readonly SESSION_STATUS_NOT_CHANGED = 'SESSION_STATUS_NOT_CHANGED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: SessionStatusNotChangedException.SESSION_STATUS_NOT_CHANGED,
        message,
      }),
    );
  }
}
