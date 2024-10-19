import DomainException from '@common/domain/exceptions/domain.exception';

export default class DependencyViolationDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
