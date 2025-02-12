import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PermissionAlreadyNotArchivedException extends BusinessConflictDomainException {
  public static readonly PERMISSION_ALREADY_NOT_ARCHIVED = 'PERMISSION_ALREADY_NOT_ARCHIVED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PermissionAlreadyNotArchivedException.PERMISSION_ALREADY_NOT_ARCHIVED,
        message,
      }),
    );
  }
}
