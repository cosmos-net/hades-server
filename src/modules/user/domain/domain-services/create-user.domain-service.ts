import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';
import { IProfileRepositoryContract } from '@user/domain/contracts/profile-repository.contract';
import { UserIsNotAvailableException } from '@user/domain/exceptions/user/user-is-not-available.exception';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { UserModel } from '@user/domain/models/user/user.model';
import { IAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { IProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';
import { IUserBaseSchema } from '@user/domain/schemas/user/user.schema-primitive';

export class CreateUserDomainService {
  constructor(
    private readonly accountRepository: IAccountRepositoryContract,
    private readonly profileRepository: IProfileRepositoryContract,
  ) {}

  async go(
    user: IUserBaseSchema,
    accounts: IAccountBaseSchema[],
    profile: IProfileBaseSchema,
  ): Promise<UserAggregate> {
    for (const account of accounts) {
      const isUsernameAlreadyInUse = await this.accountRepository.getOneBy(account.username);
      const isEmailAlreadyInUse = await this.accountRepository.getOneBy(account.email);

      if (isUsernameAlreadyInUse) {
        throw new UserIsNotAvailableException(`Username ${account.username} is not available`);
      }

      if (isEmailAlreadyInUse) {
        throw new UserIsNotAvailableException(`Email ${account.email} is not available`);
      }
    }

    const isPhoneNumberInUse = await this.profileRepository.getOneBy(profile.phoneNumber);

    if (isPhoneNumberInUse) {
      throw new UserIsNotAvailableException(`Phone ${profile.phoneNumber} is not available`);
    }

    const userModel = UserModel.fromPrimitives({
      uuid: user.uuid,
      status: user.status,
    });

    const accountsModel = accounts.map((account): AccountModel => {
      return AccountModel.fromPrimitives({
        uuid: account.uuid,
        username: account.username,
        email: account.email,
        password: account.password,
        passwordConfirmation: account.passwordConfirmation,
      });
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
      userModel,
      accountsModel,
      profileModel,
    });

    userAggregate.create();

    return userAggregate;
  }
}
