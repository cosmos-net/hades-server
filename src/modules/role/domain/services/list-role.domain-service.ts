import { Criteria } from '@common/domain/criteria/criteria';
import DomainException from '@common/domain/exceptions/domain.exception';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ExceptionFactory } from '@role/domain/exceptions/exception.factory';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';

export class ListRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(criteria: Criteria) {
    try {
      const roles = await this.roleRepository.matching(criteria);

      if (roles.getTotal === 0) {
        throw new RoleNotFoundException('No roles found');
      }

      return roles;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
