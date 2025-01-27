import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { UserModel } from '@user/domain/models/user/user.model';

export abstract class IUserRepositoryContract {
  abstract persist(user: UserAggregate): Promise<UserAggregate>;
  abstract getOneBy(uuid: string, options?: IOptions): Promise<UserAggregate>;
  abstract getUserByUUID(uuid: string, options?: IOptions): Promise<UserModel>;
  abstract destroy(userAggregate: UserAggregate): Promise<boolean>;
  abstract archive(uuid: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListUserAggregate>;
}
