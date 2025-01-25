import { ListAssignmentModel } from '@assignment/domain/models/assignment-list.model';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';

export abstract class IAssignmentRepositoryContract {
  abstract persist(assignment: AssignmentModel): Promise<AssignmentModel>;
  abstract getOneByUUID(UUID: string, options?: IOptions): Promise<AssignmentModel | null>;
  abstract getOneByUserUUID(userUUID: string, options?: IOptions): Promise<AssignmentModel | null>;
  abstract getOneByRoleUUID(roleUUID: string, options?: IOptions): Promise<AssignmentModel | null>;
  abstract getOneByTitle(title: string, options?: IOptions): Promise<AssignmentModel | null>;
  abstract getOneByDescription(
    description: string,
    options?: IOptions,
  ): Promise<AssignmentModel | null>;
  abstract destroy(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListAssignmentModel>;
}
