import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { ListUserQuery } from '@user/application/queries/use-cases/list-user/list-user.query';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { ListUserInputDto } from '@user/infrastructure/controllers/user/queries/list-user/list-user-input.dto';
import {
  IAccount,
  IListUserOutputDto,
  ListUserOutputDto,
} from '@user/infrastructure/controllers/user/queries/list-user/list-user-output.dto';

@Controller()
export class ListUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.LIST })
  async list(@Payload() listUserDto: ListUserInputDto): Promise<ListUserOutputDto> {
    const { orderType, orderBy, page, limit, offset } = listUserDto;
    const filtersMap = listUserDto.toFilterMap();

    const result = await this.queryBus.execute<ListUserQuery, ListUserAggregate>(
      new ListUserQuery({
        orderType,
        orderBy,
        limit,
        offset,
        filtersMap,
      }),
    );

    const total = result.getTotal;
    const userAggregate = result.toPrimitives();
    const items: IListUserOutputDto[] = userAggregate.map(
      ({ user, profile, accounts }): IListUserOutputDto => ({
        user: {
          id: user.id,
          uuid: user.uuid,
          status: user.status,
        },
        profile: {
          names: profile.names,
          lastName: profile.lastName,
          secondLastName: profile.secondLastName,
          phoneNumber: profile.phoneNumber,
          gender: profile.gender,
          address: profile.address,
        },
        accounts: accounts.map(
          (account): IAccount => ({
            id: account.id,
            uuid: account.uuid,
            username: account.username,
            email: account.email,
          }),
        ),
      }),
    );

    return new ListUserOutputDto(items, page, limit, total);
  }
}
