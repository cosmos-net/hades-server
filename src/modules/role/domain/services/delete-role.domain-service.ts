import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';

export class DeleteRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(uuid: string): Promise<void> {
    const role = await this.roleRepository.getOneBy(uuid);

    if (!role) {
      throw new RoleNotFoundException(`Role with uuid ${uuid} not found`);
    }

    return role.destroy(role.uuid, role.name);
  }
}
