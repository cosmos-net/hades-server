import DomainException from '@common/domain/exceptions/domain.exception';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ExceptionFactory } from '@role/domain/exceptions/exception.factory';
import { RoleNameException } from '@role/domain/exceptions/role-name.exception';
import { RoleModel } from '@role/domain/models/role.model';

export class CreateRoleDomainService {
  constructor(private readonly repository: IRoleRepositoryContract) {}

  async process(role: RoleModel): Promise<RoleModel> {
    try {
      const isNameAvailable = await this.repository.isNameAvailable(role.name);

      if (!isNameAvailable) {
        throw new RoleNameException('Role name already exists');
      }

      return await this.repository.persist(role);
    } catch (error) {
      if (error instanceof DomainException) {
        // TODO: parse error to json
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
