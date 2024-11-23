import { ListUserModel } from '@role/domain/models/user-list.model';
import { UserModel } from '@role/domain/models/user.model';

import { Criteria } from '@common/domain/criteria/criteria';

export interface IRoleRepositoryContract {
  isNameAvailable(name: string): Promise<boolean>;
  persist(role: UserModel): Promise<UserModel>;
  getOneBy(UUID: string): Promise<UserModel>;
  destroy(UUID: string): Promise<boolean>;
  archive(UUID: string): Promise<boolean>;
  matching(criteria: Criteria): Promise<ListUserModel>;
}
