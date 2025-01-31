import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { ListAssignmentModel } from '@assignment/domain/models/assignment-list.model';
import { Criteria } from '@common/domain/criteria/criteria';

export class ListAssignmentDomainService {
  constructor(private readonly assignmentRepository: IAssignmentRepositoryContract) {}

  async go(criteria: Criteria): Promise<ListAssignmentModel> {
    const assignments = await this.assignmentRepository.matching(criteria);

    if (assignments.getTotal === 0) {
      throw new AssignmentNotFoundException('No assignments found');
    }

    return assignments;
  }
}
