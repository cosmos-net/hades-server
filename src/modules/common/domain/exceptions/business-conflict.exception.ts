import DomainException from '@common/domain/exceptions/domain.exception';

export default class BusinessConflictDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
