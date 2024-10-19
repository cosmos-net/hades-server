import DomainException from '@common/domain/exceptions/domain.exception';

export default class DomainNotAllowedDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
