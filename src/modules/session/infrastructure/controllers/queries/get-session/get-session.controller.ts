import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { GetSessionQuery } from '@session/application/queries/get-session/get-session.query';
import { SessionModel } from '@session/domain/models/session.model';
import { GetSessionInputDto } from '@session/infrastructure/controllers/queries/get-session/get-session-input.dto';
import { GetSessionOutputDto } from '@session/infrastructure/controllers/queries/get-session/get-session-output.dto';

@Controller()
export class GetSessionController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: CMDS_HADES.SESSION.GET })
  async get(@Payload() getSessionInputDto: GetSessionInputDto): Promise<GetSessionOutputDto> {
    try {
      const result = await this.queryBus.execute<GetSessionQuery, SessionModel>(
        new GetSessionQuery(getSessionInputDto),
      );

      return new GetSessionOutputDto(result);
    } catch (error: unknown) {
      throw new RpcException(error as Error);
    }
  }
}
