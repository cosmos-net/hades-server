import { RoleDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/role-data-mediator.service';
import { UserDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/user-data-mediator.service';

export interface IAssignmentDataMediatorContract {
  get role(): RoleDataMediatorService;
  get user(): UserDataMediatorService;
}
