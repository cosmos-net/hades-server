import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class UpdateRoleDomainService {
  constructor(private readonly repository: IRoleRepositoryContract) {}

  async go(uuid: string, name?: string, description?: string): Promise<RoleModel> {
    const rolModel = await this.repository.getOneBy(uuid);

    if (!rolModel) {
      throw new RoleNameException('Rol not found');
    }

    rolModel.reDescribe(name, description);

    return rolModel;
  }
}
