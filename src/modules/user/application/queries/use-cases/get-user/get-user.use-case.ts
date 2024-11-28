import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserDomainService } from '@user/domain/services/get-user.domain-service';

import { GetUserQuery } from '@user/application/queries/use-cases/get-user/get-user.query';
import { UserModel } from '@user/domain/models/user.model';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserUseCase implements IQueryHandler<GetUserQuery> {
  constructor(private readonly getUserDomainService: GetUserDomainService) {}

  async execute(query: GetUserQuery): Promise<UserModel> {
    const { uuid } = query;

    const userModel = await this.getUserDomainService.go(uuid);

    return userModel;
  }
}
