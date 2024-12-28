import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { DeepPartialExceptAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { DeepPartialProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';

export class UpdateUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string, accounts: DeepPartialExceptAccountBaseSchema, profile: DeepPartialProfileBaseSchema): Promise<UserAggregate> {
    const userAggregate = await this.userRepository.getOneBy(uuid);

    if (!userAggregate) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    userAggregate.update(accounts, profile);

    await this.userRepository.persist(userAggregate);

    return userAggregate;
  }
}
