import DomainException from '@common/domain/exceptions/domain.exception';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ExceptionFactory } from '@role/domain/exceptions/exception.factory';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class UpdateRoleDomainService {
  constructor(private readonly repository: IRoleRepositoryContract) {}

  async go(uuid: string, name?: string, description?: string): Promise<RoleModel> {
    try {
      const rolModel = await this.repository.getOneBy(uuid);

      if (!rolModel) {
        // TODO: Create new exception error
        throw new RoleNameException('Rol not found');
      }

      rolModel.reDescribe(name, description);

      return rolModel;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
