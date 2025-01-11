import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class SessionNotFoundException extends ResourceNotFoundDomainException {
  public static readonly SESSION_NOT_FOUND = 'SESSION_NOT_FOUND';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: SessionNotFoundException.SESSION_NOT_FOUND, message }));
  }
}
