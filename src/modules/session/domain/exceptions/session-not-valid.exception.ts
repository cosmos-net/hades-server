import InvalidOperationDomainException from '@common/domain/exceptions/invalid-operation.exception';

export class SessionNotValidException extends InvalidOperationDomainException {
  public static readonly SESSION_NOT_VALID = 'SESSION_NOT_VALID';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: SessionNotValidException.SESSION_NOT_VALID, message }));
  }
}
