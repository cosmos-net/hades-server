import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

export abstract class IUserRepositoryContract {
  abstract persist(user: UserAggregate): Promise<UserAggregate>;
  abstract getOneBy(UUID: string, options?: IOptions): Promise<UserAggregate>;
  abstract destroy(userAggregate: UserAggregate): Promise<boolean>;
  abstract archive(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListUserAggregate>;
}
