import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchAccountByUsernameQuery } from '@user/application/use-cases/queries/search-account-by-username/search-account-by-username.query';
import { SearchAccountByUsernameDomainService } from '@user/domain/domain-services/search-account-by-username.domain-service';
import { AccountModel } from '@user/domain/models/account/account.model';

@Injectable()
@QueryHandler(SearchAccountByUsernameQuery)
export class SearchAccountByUsernameUseCase
  implements IQueryHandler<SearchAccountByUsernameQuery, AccountModel>
{
  constructor(
    private readonly searchAccountByUsernameDomainService: SearchAccountByUsernameDomainService,
  ) {}

  async execute(query: SearchAccountByUsernameQuery): Promise<AccountModel> {
    const { username, withArchived, failIfArchived, includeSessions } = query;
    const accountModel = await this.searchAccountByUsernameDomainService.execute(
      username,
      withArchived || false,
      failIfArchived || false,
      includeSessions || false,
    );
    return accountModel;
  }
}
