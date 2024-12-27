import { Criteria } from '@common/domain/criteria/criteria';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';

export class ListRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(criteria: Criteria) {
    const roles = await this.roleRepository.matching(criteria);

    if (roles.getTotal === 0) {
      throw new RoleNotFoundException('No roles found');
    }

    return roles;
  }
}
