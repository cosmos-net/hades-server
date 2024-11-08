import DomainException from '@common/domain/exceptions/domain.exception';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ExceptionFactory } from '@role/domain/exceptions/exception.factory';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class DeleteRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(uuid: string): Promise<RoleModel> {
    try {
      const roleModel = await this.roleRepository.getOneBy(uuid);

      if (!roleModel) {
        throw new RoleNotFoundException(`Role with uuid ${uuid} not found`);
      }

      roleModel.destroy(roleModel.uuid, roleModel.name);

      return roleModel;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
