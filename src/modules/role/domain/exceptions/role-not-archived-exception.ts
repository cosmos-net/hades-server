import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class RoleNotArchivedException extends BusinessConflictDomainException {
  public static readonly ROLE_NOT_ARCHIVED = 'Role not archived';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: RoleNotArchivedException.ROLE_NOT_ARCHIVED, message }));
  }
}
