import ValidationDomainException from '@common/domain/exceptions/validation.exception';
import { RoleDescriptionException } from '@role/domain/exceptions/role-description.exception';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';

export class ExceptionFactory {
  private static readonly DEFAULT_ERROR_MESSAGE = 'EXCEPTION_DOMAIN_NOT_SPECIFIED';

  static createException(type: string, details: string): void {
    if (
      type === RoleDescriptionException.INVALID_ROLE_DESCRIPTION ||
      type === RoleNotFoundException.ROLE_NOT_FOUND
    ) {
      throw new ValidationDomainException(
        JSON.stringify({
          message: RoleDescriptionException.INVALID_ROLE_DESCRIPTION,
          details,
        }),
      );
    } else {
      throw new ValidationDomainException(
        JSON.stringify({
          message: ExceptionFactory.DEFAULT_ERROR_MESSAGE,
          details,
        }),
      );
    }
  }
}
