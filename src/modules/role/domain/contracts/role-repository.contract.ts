import { Criteria } from '@common/domain/criteria/criteria';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { RoleModel } from '@role/domain/models/role.model';

export abstract class IRoleRepositoryContract {
  abstract isNameAvailable(name: string): Promise<boolean>;
  abstract persist(role: RoleModel): Promise<RoleModel>;
  abstract getOneBy(UUID: string, options?: {withDeleted: boolean}): Promise<RoleModel>;
  abstract destroy(UUID: string): Promise<boolean>;
  abstract archive(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListRoleModel>;
}
