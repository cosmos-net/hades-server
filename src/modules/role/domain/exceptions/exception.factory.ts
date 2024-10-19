import { DomainEventHandler } from '@common/domain/events/domain-events-handler';
import DomainException from '@common/domain/exceptions/domain.exception';
import ValidationDomainException from '@common/domain/exceptions/validation.exception';
import { RoleDescriptionException } from '@role/domain/exceptions/role-description.exception';

export class ExceptionFactory {
  static createException(type: string, details: string): void {
    if (type === RoleDescriptionException.INVALID_ROLE_DESCRIPTION) {
      DomainEventHandler.dispatch(
        RoleDescriptionException.INVALID_ROLE_DESCRIPTION,
        new ValidationDomainException(
          JSON.stringify({
            message: RoleDescriptionException.INVALID_ROLE_DESCRIPTION,
            details,
          }),
        ),
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
