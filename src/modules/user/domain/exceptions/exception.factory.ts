import { DomainEventHandler } from '@common/domain/events/domain-events-handler';
import DomainException from '@common/domain/exceptions/domain.exception';
import ValidationDomainException from '@common/domain/exceptions/validation.exception';
import { UserNotFoundException } from '@user/domain/exceptions/user-not-found.exception';

export class ExceptionFactory {
  static createException(type: string, details: string): void {
    if (type === UserNotFoundException.USER_NOT_FOUND) {
      throw new ValidationDomainException(
        JSON.stringify({
          message: UserNotFoundException.USER_NOT_FOUND,
          details,
        }),
      );
    } else {
      DomainEventHandler.dispatch(
        'DEFAULT_EXCEPTION',
        new DomainException(
          JSON.stringify({
            message: 'DEFAULT_EXCEPTION',
            details,
          }),
        ),
      );
    }
  }
}
