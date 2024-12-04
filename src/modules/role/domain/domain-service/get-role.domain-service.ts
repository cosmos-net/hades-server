import DomainException from '@common/domain/exceptions/domain.exception';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ExceptionFactory } from '@role/domain/exceptions/exception.factory';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';

export class GetRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(uuid: string) {
    try {
      const role = await this.roleRepository.getOneBy(uuid);

      if (!role) {
        throw new RoleNotFoundException(`Role with uuid ${uuid} not found`);
      }

      return role;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
