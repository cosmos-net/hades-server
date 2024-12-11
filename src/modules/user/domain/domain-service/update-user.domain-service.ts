import DomainException from '@common/domain/exceptions/domain.exception';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ExceptionFactory } from '@user/domain/exceptions/exception.factory';
import { IAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { IProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export class UpdateUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(
    uuid: string,
    account?: Partial<IAccountBaseSchema>,
    profile?: Partial<IProfileBaseSchema>,
  ): Promise<UserAggregate> {
    try {
      const userAggregate = await this.userRepository.getOneBy(uuid);

      userAggregate.update(account, profile);

      await this.userRepository.persist(userAggregate);

      return userAggregate;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
