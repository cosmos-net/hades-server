import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class ArchiveRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(uuid: string): Promise<RoleModel> {
    const roleModel = await this.roleRepository.getOneBy(uuid, { withArchived: true });

    if (!roleModel) {
      throw new RoleNotFoundException(`Role with uuid ${uuid} not found`);
    }

    if (roleModel.archivedAt) {
      throw new RoleNotFoundException(`Role with uuid ${uuid} is already archived`);
    }

    roleModel.archive(roleModel.uuid, roleModel.name);

    return roleModel;
  }
}
