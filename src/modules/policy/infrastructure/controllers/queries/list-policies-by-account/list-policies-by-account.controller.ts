import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Auth } from '@common/infrastructure/controllers/decorators/auth.decorator';
import { PermissionsEnum } from '@common/infrastructure/controllers/enums/permissions.enum';
import { handleDomainException } from '@helpers/exceptions/handle-domain-exception.helper';
import { ListPoliciesByAccountQuery } from '@policy/application/use-cases/queries/list-policies-by-account/list-policies-by-account.query';
import { ListPoliciesByAccountInputDto } from '@policy/infrastructure/controllers/queries/list-policies-by-account/list-policies-by-account-input.dto';
import { ListPoliciesByAccountOutputDto } from '@policy/infrastructure/controllers/queries/list-policies-by-account/list-policies-by-account-output.dto';

@ApiTags('Policy')
@Controller('policy')
export class ListPoliciesByAccountController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    summary: 'List all policies by account UUID',
    description: 'Returns all policies related to a specific account',
  })
  @ApiParam({
    name: 'accountUUID',
    description: 'The UUID of the account to get policies for',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'withArchived',
    description: 'Include archived policies',
    required: false,
    type: Boolean,
  })
  @ApiOkResponse({
    description: 'List of policies',
    type: ListPoliciesByAccountOutputDto,
  })
  @Auth(PermissionsEnum.POLICY.LIST)
  //TODO: Change to message pattern
  @Get('account/:accountUUID')
  async execute(
    @Param() params: ListPoliciesByAccountInputDto,
    @Query('withArchived') withArchived: boolean,
  ): Promise<ListPoliciesByAccountOutputDto> {
    try {
      const query = new ListPoliciesByAccountQuery({
        accountUUID: params.accountUUID,
        withArchived,
      });

      const listPolicyModel = await this.queryBus.execute(query);

      return new ListPoliciesByAccountOutputDto(listPolicyModel);
    } catch (error) {
      handleDomainException(error);
    }
  }
}