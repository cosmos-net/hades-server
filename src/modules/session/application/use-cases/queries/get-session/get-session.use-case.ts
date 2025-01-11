import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetSessionQuery } from '@session/application/use-cases/queries/get-session/get-session.query';
import { GetSessionDomainService } from '@session/domain/domain-services/get-session.domain-service';
import { SessionModel } from '@session/domain/models/session.model';

@Injectable()
@QueryHandler(GetSessionQuery)
export class GetSessionUseCase implements IQueryHandler<GetSessionQuery, SessionModel> {
  constructor(private readonly getSessionDomainService: GetSessionDomainService) {}

  async execute(query: GetSessionQuery): Promise<SessionModel> {
    const { uuid, withArchived } = query;

    const sessionModel = await this.getSessionDomainService.go(uuid, withArchived);

    return sessionModel;
  }
}
