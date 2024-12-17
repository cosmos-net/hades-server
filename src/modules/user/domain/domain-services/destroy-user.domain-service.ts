import DomainException from '@common/domain/exceptions/domain.exception';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ExceptionFactory } from '@user/domain/exceptions/exception.factory';
import { UserNotFoundException } from '@user/domain/exceptions/user-not-found.exception';

export class DestroyUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string): Promise<UserAggregate> {
    try {
      const userAggregate = await this.userRepository.getOneBy(uuid);

      if (!userAggregate) {
        throw new UserNotFoundException(`User with uuid ${uuid} not found`);
      }

      userAggregate.destroy();

      return userAggregate;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
