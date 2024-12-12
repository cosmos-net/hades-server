import { ExceptionFactory } from '@user/domain/exceptions/exception.factory';
import { UserNotFoundException } from '@user/domain/exceptions/user-not-found.exception';

import { Criteria } from '@common/domain/criteria/criteria';
import DomainException from '@common/domain/exceptions/domain.exception';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';

export class ListUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(criteria: Criteria): Promise<ListUserModel> {
    try {
      const users = await this.userRepository.matching(criteria);

      if (users.getTotal === 0) {
        throw new UserNotFoundException('No users found');
      }

      return users;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }

      throw error;
    }
  }
}
