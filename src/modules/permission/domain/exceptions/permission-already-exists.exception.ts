import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PermissionAlreadyExistsError extends BusinessConflictDomainException {
  public static readonly PERMISSION_ALREADY_EXISTS = 'Permission already exists';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PermissionAlreadyExistsError.PERMISSION_ALREADY_EXISTS,
        message,
      }),
    );
  }
}
