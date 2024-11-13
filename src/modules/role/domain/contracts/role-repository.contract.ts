import { Criteria } from '@common/domain/criteria/criteria';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { RoleModel } from '@role/domain/models/role.model';

export interface IRoleRepositoryContract {
  isNameAvailable(name: string): Promise<boolean>;
  persist(role: RoleModel): Promise<RoleModel>;
  getOneBy(UUID: string): Promise<RoleModel>;
  destroy(UUID: string): Promise<boolean>;
  archive(UUID: string): Promise<boolean>;
  matching(criteria: Criteria): Promise<ListRoleModel>;
}
