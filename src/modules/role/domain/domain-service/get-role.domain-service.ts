import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class GetRoleDomainService {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async go(uuid: string, withArchived?: boolean, failIfArchived?: boolean): Promise<RoleModel> {
    const role = await this.roleRepository.getOneBy(uuid, { withArchived });

    if (!role) {
      throw new RoleNotFoundException(`Role with uuid ${uuid} not found`);
    }

    if (failIfArchived && role.archivedAt) {
      throw new RoleNotFoundException(`Role with uuid ${uuid} is archived`);
    }

    return role;
  }
}
