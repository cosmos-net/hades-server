import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class CreateRoleDomainService {
  constructor(private readonly repository: IRoleRepositoryContract) {}

  async go(uuid: string, name: string, description?: string): Promise<RoleModel> {
    const roleModel = await this.repository.getOneBy(name, { withArchived: true });

    if (roleModel) {
      if (roleModel.archivedAt) {
        throw new RoleNameException(
          `Role name already exists but is archived with date ${roleModel.archivedAt}`,
        );
      }

      throw new RoleNameException('Role name already exists');
    }

    const role = new RoleModel(uuid, name, description);
    role.create();

    return role;
  }
}
