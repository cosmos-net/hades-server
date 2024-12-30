import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserNotArchivedException } from '@user/domain/exceptions/user/user-not-archived.exception';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';

export class DestroyUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string): Promise<UserAggregate> {
    const userAggregate = await this.userRepository.getOneBy(uuid, { withArchived: true });

    if (!userAggregate) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    if (!userAggregate.userModel.archivedAt) {
      throw new UserNotArchivedException(`User with uuid ${uuid} is not archived`);
    }

    userAggregate.destroy();

    return userAggregate;
  }
}
