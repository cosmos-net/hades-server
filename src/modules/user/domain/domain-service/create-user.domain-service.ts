import DomainException from '@common/domain/exceptions/domain.exception';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ExceptionFactory } from '@user/domain/exceptions/exception.factory';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { IAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { IProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export class CreateUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(account: IAccountBaseSchema, profile: IProfileBaseSchema): Promise<UserAggregate> {
    try {
      const accountModel = AccountModel.fromPrimitives({
        uuid: account.uuid,
        username: account.username,
        password: account.password,
        email: account.email,
      });

      const profileModel = ProfileModel.fromPrimitives({
        uuid: profile.uuid,
        names: profile.names,
        lastName: profile.lastName,
        secondLastName: profile.secondLastName,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        address: profile.address,
      });

      const userAggregate = new UserAggregate({
        accountModel,
        profileModel,
      });

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
