import { Injectable } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { ListUserModel } from '@user/domain/models/user-list.model';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserQuery } from '@user/application//queries/use-cases/list-user/list-user.query';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';

@Injectable()
export class ListUserUseCase implements IQueryHandler<ListUserQuery, ListUserModel> {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(query: ListUserQuery): Promise<ListUserModel> {
    const { orderType, orderBy, limit, offset, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset);

    const users = await this.userRepository.matching(criteria);

    return users;
  }
}