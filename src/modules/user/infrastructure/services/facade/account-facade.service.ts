import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetAccountQuery } from '@user/application/use-cases/queries/get-account/get-account.query';
import { AccountModel } from '@user/domain/models/account/account.model';

@Injectable()
export class AccountFacadeService {
  constructor(private readonly queryBus: QueryBus) {}

  async get(query: GetAccountQuery): Promise<AccountModel> {
    const result = await this.queryBus.execute<GetAccountQuery, AccountModel>(
      new GetAccountQuery(query),
    );

    return result;
  }
}
