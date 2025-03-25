import { IAccountRepositoryContract } from '@user/domain/contracts/account-repository.contract';
import { AccountArchivedException } from '@user/domain/exceptions/account/account-archived.exception';
import { AccountNotFoundException } from '@user/domain/exceptions/account/account-not-found.exception';
import { AccountModel } from '@user/domain/models/account/account.model';

export class SearchAccountByEmailDomainService {
  constructor(private readonly accountRepository: IAccountRepositoryContract) {}

  async execute(
    email: string,
    withArchived: boolean,
    failIfArchived: boolean,
    includeSession: boolean,
  ): Promise<AccountModel> {
    const accountModel = await this.accountRepository.searchByEmail(email, {
      withArchived,
      include: includeSession ? ['sessions'] : [],
    });

    if (!accountModel) {
      throw new AccountNotFoundException(`Account with email ${email} not found`);
    }

    if (failIfArchived && accountModel.archivedAt) {
      throw new AccountArchivedException(`Account with email ${email} is archived`);
    }

    return accountModel;
  }
}
