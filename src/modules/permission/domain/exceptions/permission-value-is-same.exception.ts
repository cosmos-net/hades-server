import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class PermissionValueIsSameException extends BusinessConflictDomainException {
  public static readonly PERMISSION_VALUE_IS_SAME = 'Permission value is the same';

  constructor(public readonly message: string) {
    super(
      JSON.stringify({
        name: PermissionValueIsSameException.PERMISSION_VALUE_IS_SAME,
        message,
      }),
    );
  }
}
