import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';

export class AssignmentMustBeArchivedException extends ResourceNotFoundDomainException {
  public static readonly ASSIGNMENT_MUST_BE_ARCHIVED = 'ASSIGNMENT_MUST_BE_ARCHIVED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: AssignmentMustBeArchivedException.ASSIGNMENT_MUST_BE_ARCHIVED,
        message,
      }),
    );
  }
}
