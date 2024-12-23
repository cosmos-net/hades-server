import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class CreateRoleDomainService {
  constructor(private readonly repository: IRoleRepositoryContract) {}

  async go(uuid: string, name: string, description?: string): Promise<RoleModel> {
      const isNameAvailable = await this.repository.isNameAvailable(name);

      if (!isNameAvailable) {
        throw new RoleNameException('Role name already exists');
      }

      const role = new RoleModel(uuid, name, description);
      role.create();

      return role;
  }
}
