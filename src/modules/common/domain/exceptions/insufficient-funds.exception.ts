import DomainException from '@common/domain/exceptions/domain.exception';

export default class InsufficientFundsDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
