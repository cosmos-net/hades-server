import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class RoleAlreadyArchivedException extends BusinessConflictDomainException {
  public static readonly ROLE_ALREADY_ARCHIVED = 'Role already archived';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: RoleAlreadyArchivedException.ROLE_ALREADY_ARCHIVED,
        message,
      }),
    );
  }
}
