import DomainException from '@common/domain/exceptions/domain.exception';

export default class ConcurrencyDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
