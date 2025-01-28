import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from '@user/application/use-cases/queries/get-user/get-user.query';
import { GetUserDomainService } from '@user/domain/domain-services/get-user.domain-service';
import { UserModel } from '@user/domain/models/user/user.model';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserUseCase implements IQueryHandler<GetUserQuery> {
  constructor(private readonly getUserDomainService: GetUserDomainService) {}

  async execute(query: GetUserQuery): Promise<UserModel> {
    const { uuid, withArchived, failIfArchived, status } = query;

    const userModel = await this.getUserDomainService.go(
      uuid,
      withArchived,
      failIfArchived,
      status,
    );

    return userModel;
  }
}
