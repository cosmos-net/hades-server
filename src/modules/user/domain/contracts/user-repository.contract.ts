import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

export interface IUserRepositoryContract {
  persist(user: UserAggregate): Promise<UserAggregate>;
  getOneBy(UUID: string): Promise<UserAggregate>;
  destroy(UUID: string): Promise<boolean>;
  archive(UUID: string): Promise<boolean>;
  matching(criteria: Criteria): Promise<ListUserAggregate>;
}
