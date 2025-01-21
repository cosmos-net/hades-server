import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from '@user/application/use-cases/queries/get-user/get-user.query';
import { UserModel } from '@user/domain/models/user/user.model';

@Injectable()
export class UserOrchestratorProducerService {
  constructor(private readonly queryBus: QueryBus) {}

  async getByUUID(getRoleQuery: GetUserQuery): Promise<UserModel> {
    const result = await this.queryBus.execute<GetUserQuery, UserModel>(getRoleQuery);

    return result;
  }
}
