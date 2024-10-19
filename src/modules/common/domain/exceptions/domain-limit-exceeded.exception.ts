import DomainException from '@common/domain/exceptions/domain.exception';

export default class DomainLimitExceededDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
