import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { SearchAccountByEmailQuery } from '@user/application/use-cases/queries/search-account-by-email/search-account-by-email.query';
import { SearchAccountByEmailInputDto } from '@user/infrastructure/controllers/queries/search-account-by-email/search-account-by-email-input.dto';
import { SearchAccountByEmailOutputDto } from '@user/infrastructure/controllers/queries/search-account-by-email/search-account-by-email-output.dto';

@Controller()
export class SearchAccountByEmailController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.ACCOUNT.SEARCH_ACCOUNT_BY_EMAIL })
  async execute(
    @Payload() dto: SearchAccountByEmailInputDto,
  ): Promise<SearchAccountByEmailOutputDto> {
    try {
      const { email, withArchived, failIfArchived, includeSessions } = dto;

      const query = new SearchAccountByEmailQuery(
        email,
        withArchived,
        failIfArchived,
        includeSessions,
      );

      const accountModel = await this.queryBus.execute(query);
      const outputDto = new SearchAccountByEmailOutputDto(accountModel);

      return outputDto;
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
