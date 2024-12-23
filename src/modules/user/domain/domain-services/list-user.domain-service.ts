import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserNotFoundException } from '@user/domain/exceptions/user-not-found.exception';

export class ListUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(criteria: Criteria): Promise<ListUserAggregate> {
    const listUserAggregate = await this.userRepository.matching(criteria);

    if (listUserAggregate.getTotal === 0) {
      throw new UserNotFoundException('No users found');
    }

    return listUserAggregate;
  }
}
