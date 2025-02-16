import { Injectable } from '@nestjs/common';

import { IAssignmentDataMediatorContract } from '@assignment/domain/contracts/assignment-data-mediator.contract';
import { DataMediatorService } from '@shared/infrastructure/services/data-mediator-service/data-mediator.service';
import { RoleDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/role-data-mediator.service';
import { UserDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/user-data-mediator.service';

@Injectable()
export class AssignmentDataMediatorService implements IAssignmentDataMediatorContract {
  constructor(private readonly dataMediatorService: DataMediatorService) {}

  get role(): RoleDataMediatorService {
    return this.dataMediatorService.role;
  }

  get user(): UserDataMediatorService {
    return this.dataMediatorService.user;
  }
}
