import DomainException from '@common/domain/exceptions/domain.exception';

export default class InvalidOperationDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
