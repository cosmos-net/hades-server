import DomainException from '@common/domain/exceptions/domain.exception';

export default class ValidationDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
