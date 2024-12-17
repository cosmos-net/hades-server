import DomainException from '@common/domain/exceptions/domain.exception';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ExceptionFactory } from '@user/domain/exceptions/exception.factory';
import { DeepPartialExceptAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { DeepPartialProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export class UpdateUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go({
    uuid,
    accounts,
    profile,
  }: {
    uuid: string;
    accounts: DeepPartialExceptAccountBaseSchema;
    profile: DeepPartialProfileBaseSchema;
  }): Promise<UserAggregate> {
    try {
      const userAggregate = await this.userRepository.getOneBy(uuid);

      userAggregate.update(accounts, profile);

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
