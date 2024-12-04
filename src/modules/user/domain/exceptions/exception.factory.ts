import { DomainEventHandler } from '@common/domain/events/domain-events-handler';
import DomainException from '@common/domain/exceptions/domain.exception';
import { UserNotFoundException } from '@user/domain/exceptions/user-not-found.exceptions';

export class ExceptionFactory {
  static createException(type: string, details: string): void {
    if (type === UserNotFoundException.USER_NOT_FOUND) {
      /* empty */
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
