import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserAlreadyArchivedException } from '@user/domain/exceptions/user/user-already-archived.exception';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';

export class ArchiveUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string): Promise<UserAggregate> {
    const userAggregate = await this.userRepository.getOneBy(uuid, { withArchived: true });

    if (!userAggregate) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    if (userAggregate.userModel.archivedAt) {
      throw new UserAlreadyArchivedException(`User with uuid ${uuid} is already archived`);
    }

    userAggregate.archive();

    return userAggregate;
  }
}
