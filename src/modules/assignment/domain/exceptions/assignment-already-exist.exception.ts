import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class AssignmentAlreadyExistException extends BusinessConflictDomainException {
  public static readonly ASSIGNMENT_ALREADY_EXISTS = 'ASSIGNMENT_ALREADY_EXISTS';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({ name: AssignmentAlreadyExistException.ASSIGNMENT_ALREADY_EXISTS, message }),
    );
  }
}
