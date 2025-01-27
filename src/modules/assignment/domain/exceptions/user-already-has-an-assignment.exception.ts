import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class UserAlreadyHasAnAssignmentException extends BusinessConflictDomainException {
  public static readonly USER_ALREADY_HAS_AN_ASSIGNMENT = 'USER_ALREADY_HAS_AN_ASSIGNMENT';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: UserAlreadyHasAnAssignmentException.USER_ALREADY_HAS_AN_ASSIGNMENT,
        message,
      }),
    );
  }
}
