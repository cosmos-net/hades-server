import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';

export class ArchiveRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(uuid: string): Promise<void> {
    const role = await this.roleRepository.getOneBy(uuid);

    if (!role) {
      // TODO: Create a custom error
      throw new RoleNotFoundException(`Role with uuid ${uuid} not found`);
    }
    role.archive(role.uuid, role.name);
  }
}
