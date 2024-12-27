import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { IAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { IProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export class CreateUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async go(accounts: IAccountBaseSchema[], profile: IProfileBaseSchema): Promise<UserAggregate> {
    const accountsModel = accounts.map((account): AccountModel => {
      return AccountModel.fromPrimitives({
        uuid: account.uuid,
        username: account.username,
        email: account.email,
        password: account.password,
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
      accountsModel,
      profileModel,
    });

    await this.userRepository.persist(userAggregate);

    return userAggregate;
  }
}
