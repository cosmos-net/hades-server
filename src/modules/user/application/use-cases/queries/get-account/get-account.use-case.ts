import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAccountQuery } from '@user/application/use-cases/queries/get-account/get-account.query';
import { GetAccountDomainService } from '@user/domain/domain-services/get-account.domain-service';
import { AccountModel } from '@user/domain/models/account/account.model';

@Injectable()
@QueryHandler(GetAccountQuery)
export class GetAccountUseCase implements IQueryHandler<GetAccountQuery> {
  constructor(private readonly getAccountDomainService: GetAccountDomainService) {}

  async execute(query: GetAccountQuery): Promise<AccountModel> {
    const { uuid, withArchived, failIfArchived, includeSessions } = query;

    const accountModel = await this.getAccountDomainService.go(
      uuid,
      withArchived,
      failIfArchived,
      includeSessions,
    );

    return accountModel;
  }
}
