import { Criteria } from '@common/domain/criteria/criteria';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { ListUserModel } from '@user/domain/models/user/user-list.model';

export interface IUserRepositoryContract {
  persist(user: UserAggregate): Promise<UserAggregate>;
  getOneBy(UUID: string): Promise<UserAggregate>;
  destroy(UUID: string): Promise<boolean>;
  archive(UUID: string): Promise<boolean>;
  matching(criteria: Criteria): Promise<ListUserModel>;
}
