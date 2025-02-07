import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PermissionNotFoundException extends BusinessConflictDomainException {
  public static readonly PERMISSION_NOT_FOUND = 'Permission not found';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PermissionNotFoundException.PERMISSION_NOT_FOUND,
        message,
      }),
    );
  }
}
