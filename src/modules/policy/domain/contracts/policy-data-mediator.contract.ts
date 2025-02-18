import { PermissionDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/permission-data-mediator.service';
import { RoleDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/role-data-mediator.service';

export interface IPolicyDataMediatorContract {
  get role(): RoleDataMediatorService;
  get permission(): PermissionDataMediatorService;
}
