import DomainException from '@common/domain/exceptions/domain.exception';

export default class ResourceNotFoundDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
