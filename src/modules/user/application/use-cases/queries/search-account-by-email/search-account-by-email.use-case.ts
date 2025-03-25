import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchAccountByEmailQuery } from '@user/application/use-cases/queries/search-account-by-email/search-account-by-email.query';
import { SearchAccountByEmailDomainService } from '@user/domain/domain-services/search-account-by-email.domain-service';
import { AccountModel } from '@user/domain/models/account/account.model';

@Injectable()
@QueryHandler(SearchAccountByEmailQuery)
export class SearchAccountByEmailUseCase
  implements IQueryHandler<SearchAccountByEmailQuery, AccountModel>
{
  constructor(
    private readonly searchAccountByEmailDomainService: SearchAccountByEmailDomainService,
  ) {}

  async execute(query: SearchAccountByEmailQuery): Promise<AccountModel> {
    const { email, withArchived, failIfArchived, includeSessions } = query;
    const accountModel = await this.searchAccountByEmailDomainService.execute(
      email,
      withArchived || false,
      failIfArchived || false,
      includeSessions || false,
    );
    return accountModel;
  }
}
