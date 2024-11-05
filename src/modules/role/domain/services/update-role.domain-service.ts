import DomainException from '@common/domain/exceptions/domain.exception';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ExceptionFactory } from '@role/domain/exceptions/exception.factory';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class UpdateRoleDomainService {
  constructor(private readonly repository: IRoleRepositoryContract) {}

  async go(uuid: string, name: string, description?: string): Promise<RoleModel> {
    try {
      const isNameAvailable = await this.repository.isNameAvailable(name);

      if (!isNameAvailable) {
        throw new RoleNameException('Role name already exists');
      }

      const role = new RoleModel(uuid, name, description);
      role.create();

      return role;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
