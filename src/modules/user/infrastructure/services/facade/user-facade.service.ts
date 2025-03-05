import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from '@user/application/use-cases/queries/get-user/get-user.query';
import { UserModel } from '@user/domain/models/user/user.model';

@Injectable()
export class UserFacadeService {
  constructor(private readonly queryBus: QueryBus) {}

  async get(query: GetUserQuery): Promise<UserModel> {
    const result = await this.queryBus.execute<GetUserQuery, UserModel>(new GetUserQuery(query));

    return result;
  }
}
