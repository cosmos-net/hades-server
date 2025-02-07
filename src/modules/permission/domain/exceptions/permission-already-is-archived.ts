import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PermissionAlreadyIsArchived extends BusinessConflictDomainException {
  public static readonly PERMISSION_ALREADY_IS_ARCHIVED = 'PERMISSION_ALREADY_IS_ARCHIVED';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PermissionAlreadyIsArchived.PERMISSION_ALREADY_IS_ARCHIVED,
        message,
      }),
    );
  }
}
