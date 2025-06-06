import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';
import { AccountArchivedException } from '@user/domain/exceptions/account/account-archived.exception';
import { AccountNotFoundException } from '@user/domain/exceptions/account/account-not-found.exception';
import { AccountModel } from '@user/domain/models/account/account.model';

export class SearchAccountByUsernameDomainService {
  constructor(private readonly accountRepository: IAccountRepositoryContract) {}

  async execute(
    username: string,
    withArchived: boolean,
    failIfArchived: boolean,
    includeSession: boolean,
  ): Promise<AccountModel> {
    const accountModel = await this.accountRepository.searchByUsername(username, {
      withArchived,
      include: includeSession ? ['sessions'] : [],
    });

    if (!accountModel) {
      throw new AccountNotFoundException(`Account with username ${username} not found`);
    }

    if (failIfArchived && accountModel.archivedAt) {
      throw new AccountArchivedException(`Account with username ${username} is archived`);
    }

    return accountModel;
  }
}
