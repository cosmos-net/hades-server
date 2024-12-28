import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';

export class GetUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string): Promise<UserAggregate> {
    const user = await this.userRepository.getOneBy(uuid);

    if (!user) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    return user;
  }
}
