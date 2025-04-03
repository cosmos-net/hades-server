import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { SearchAccountByUsernameQuery } from '@user/application/use-cases/queries/search-account-by-username/search-account-by-username.query';
import { SearchAccountByUsernameInputDto } from '@user/infrastructure/controllers/queries/search-account-by-username/search-account-by-username-input.dto';
import { SearchAccountByUsernameOutputDto } from '@user/infrastructure/controllers/queries/search-account-by-username/search-account-by-username-output.dto';

@Controller()
export class SearchAccountByUsernameController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.ACCOUNT.SEARCH_ACCOUNT_BY_USERNAME })
  async execute(
    @Payload() dto: SearchAccountByUsernameInputDto,
  ): Promise<SearchAccountByUsernameOutputDto> {
    try {
      const { username, withArchived, failIfArchived, includeSessions } = dto;
      const query = new SearchAccountByUsernameQuery(
        username,
        withArchived,
        failIfArchived,
        includeSessions,
      );
      const accountModel = await this.queryBus.execute(query);
      const outputDto = new SearchAccountByUsernameOutputDto(accountModel);
      return outputDto;
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
