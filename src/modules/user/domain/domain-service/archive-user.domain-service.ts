import DomainException from '@common/domain/exceptions/domain.exception';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ExceptionFactory } from '@user/domain/exceptions/exception.factory';
import { UserNotFoundException } from '@user/domain/exceptions/user-not-found.exceptions';
import { UserModel } from '@user/domain/models/user.model';

export class ArchiveUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string): Promise<UserModel> {
    try {
      const userModel = await this.userRepository.getOneBy(uuid);

      if (!userModel) {
        throw new UserNotFoundException(`User with uuid ${uuid} not found`);
      }

      userModel.archive(userModel.uuid);

      return userModel;
    } catch (error) {
      if (error instanceof DomainException) {
        ExceptionFactory.createException(error.name, error.message);
      }
    }
  }
}
