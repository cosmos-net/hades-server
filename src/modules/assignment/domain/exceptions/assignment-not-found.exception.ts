import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class AssignmentNotFoundException extends ResourceNotFoundDomainException {
  public static readonly ASSIGNMENT_NOT_FOUND = 'ASSIGNMENT_NOT_FOUND';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: AssignmentNotFoundException.ASSIGNMENT_NOT_FOUND,
        message,
      }),
    );
  }
}
