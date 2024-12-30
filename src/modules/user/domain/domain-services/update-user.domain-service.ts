import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';
import { IProfileRepositoryContract } from '@user/domain/contracts/profile-repository.contract';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserIsNotAvailableException } from '@user/domain/exceptions/user/user-is-not-available.exception';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { DeepPartialExceptAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { DeepPartialProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export class UpdateUserDomainService {
  constructor(
    private readonly userRepository: IUserRepositoryContract,
    private readonly accountRepository: IAccountRepositoryContract,
    private readonly profileRepository: IProfileRepositoryContract,
  ) {}

  private getAccountsNotFound(
    accountsWithUpdates: DeepPartialExceptAccountBaseSchema,
    accountsModel: AccountModel[],
  ): DeepPartialExceptAccountBaseSchema {
    const accountsNotFound: DeepPartialExceptAccountBaseSchema = [];

    accountsWithUpdates.forEach((account): void => {
      const accountIndex = accountsModel.findIndex(
        (accountModel): boolean => accountModel.uuid === account.uuid,
      );

      if (accountIndex === -1) {
        accountsNotFound.push(account);
      }
    });

    return accountsNotFound;
  }

  private async validateUniqueUser(
    accounts: DeepPartialExceptAccountBaseSchema,
    profile: DeepPartialProfileBaseSchema,
    accountModels: AccountModel[],
    profileModel: ProfileModel,
  ): Promise<void> {
    for await (const account of accounts) {
      const accountMatchUsername = await this.accountRepository.getOneBy(account.username);
      const accountMatchEmail = await this.accountRepository.getOneBy(account.email);

      if (accountMatchUsername) {
        const isSameAccount = accountModels.some(
          (account): boolean => account.uuid === accountMatchUsername.uuid,
        );

        if (!isSameAccount) {
          throw new UserIsNotAvailableException(`Username ${account.username} is not available`);
        }
      }

      if (accountMatchEmail) {
        const isSameAccount = accountModels.some(
          (account): boolean => account.uuid === accountMatchEmail.uuid,
        );

        if (!isSameAccount) {
          throw new UserIsNotAvailableException(`Email ${account.email} is not available`);
        }
      }
    }

    const profileMatchPhoneNumber = await this.profileRepository.getOneBy(profile.phoneNumber);

    if (profileMatchPhoneNumber) {
      const isSameProfile = profileMatchPhoneNumber.uuid === profileModel.uuid;

      if (!isSameProfile) {
        throw new UserIsNotAvailableException(`Phone ${profile.phoneNumber} is not available`);
      }
    }
  }

  public async go(
    uuid: string,
    accounts: DeepPartialExceptAccountBaseSchema,
    profile: DeepPartialProfileBaseSchema,
  ): Promise<UserAggregate> {
    const userAggregate = await this.userRepository.getOneBy(uuid);

    if (!userAggregate) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    const { accountsModel, profileModel } = userAggregate;

    const accountsNotFound = this.getAccountsNotFound(accounts, accountsModel);

    if (accountsNotFound.length > 0) {
      throw new UserNotFoundException(
        `Accounts with uuids ${accountsNotFound.map((account): string => account.uuid).join(', ')} not found`,
      );
    }

    await this.validateUniqueUser(accounts, profile, accountsModel, profileModel);

    userAggregate.update(accounts, profile);

    return userAggregate;
  }
}
