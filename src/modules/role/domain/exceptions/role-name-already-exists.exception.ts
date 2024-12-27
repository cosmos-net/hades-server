import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export class RoleNameException extends BusinessConflictDomainException {
  public static readonly ROLE_NAME_ALREADY_EXISTS = 'Role name already exists';

  constructor(public readonly message: string) {
    super(JSON.stringify({ name: RoleNameException.ROLE_NAME_ALREADY_EXISTS, message }));
  }
}