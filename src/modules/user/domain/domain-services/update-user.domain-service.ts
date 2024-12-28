import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { DeepPartialExceptAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { DeepPartialProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';
import { UserNotFoundException } from '@user/domain/exceptions/user/user-not-found.exception';
import { AccountModel } from '../models/account/account.model';

export class UpdateUserDomainService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  private getAccountsNotFound(accountsWithUpdates: DeepPartialExceptAccountBaseSchema, accountsModel: AccountModel[]): DeepPartialExceptAccountBaseSchema {
    const accountsNotFound: DeepPartialExceptAccountBaseSchema = [];  

    accountsWithUpdates.forEach((account) => {
      const accountIndex = accountsModel.findIndex((accountModel) => accountModel.uuid === account.uuid);

      if (accountIndex === -1) {
        accountsNotFound.push(account);
      }
    });

    return accountsNotFound;
  }

  public async go(uuid: string, accounts: DeepPartialExceptAccountBaseSchema, profile: DeepPartialProfileBaseSchema): Promise<UserAggregate> {
    const userAggregate = await this.userRepository.getOneBy(uuid);

    if (!userAggregate) {
      throw new UserNotFoundException(`User with uuid ${uuid} not found`);
    }

    const accountsNotFound = this.getAccountsNotFound(accounts, userAggregate.accountsModel);

    if (accountsNotFound.length > 0) {
      throw new UserNotFoundException(`Accounts with uuids ${accountsNotFound.map((account) => account.uuid).join(', ')} not found`);
    }

    userAggregate.update(accounts, profile);

    await this.userRepository.persist(userAggregate);

    return userAggregate;
  }
}
