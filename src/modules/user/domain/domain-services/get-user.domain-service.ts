import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';

export class GetUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string, withArchived: boolean, failIfArchived: boolean): Promise<UserAggregate> {
    const userAggregate = await this.userRepository.getOneBy(uuid, {
      withArchived,
    });

    if (!userAggregate) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    if (failIfArchived && userAggregate.userModel.archivedAt) {
      throw new UserNotFoundException(`User with uuid ${uuid} is archived`);
    }

    return userAggregate;
  }
}
