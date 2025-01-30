import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetAssignmentQuery } from '@assignment/application/use-cases/queries/get-assignment/get-assignment.query';
import { GetAssignmentDomainService } from '@assignment/domain/domain-services/get-assignment.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@QueryHandler(GetAssignmentQuery)
export class GetAssignmentUseCase implements IQueryHandler<GetAssignmentQuery> {
  constructor(private readonly getAssignmentDomainService: GetAssignmentDomainService) {}

  async execute(query: GetAssignmentQuery): Promise<AssignmentModel> {
    const { uuid, withArchived, failIfArchived } = query;

    const assignmentModel = await this.getAssignmentDomainService.go(
      uuid,
      withArchived,
      failIfArchived,
    );

    return assignmentModel;
  }
}
