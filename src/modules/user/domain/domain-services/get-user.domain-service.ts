import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';
import { UserModel } from '@user/domain/models/user/user.model';

export class GetUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(uuid: string, withArchived: boolean, failIfArchived: boolean): Promise<UserModel> {
    const userModel = await this.userRepository.getUserByUUID(uuid, {
      withArchived,
    });

    if (!userModel) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    if (failIfArchived && userModel.archivedAt) {
      throw new UserNotFoundException(`User with uuid ${uuid} is archived`);
    }

    return userModel;
  }
}
