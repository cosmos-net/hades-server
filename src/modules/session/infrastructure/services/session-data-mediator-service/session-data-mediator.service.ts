import { Injectable } from '@nestjs/common';

import { ISessionDataMediatorContract } from '@session/domain/contracts/session-data-mediator.contract';
import { AccountDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/account-data-mediator.service';
import { DataMediatorService } from '@shared/infrastructure/services/data-mediator-service/data-mediator.service';

@Injectable()
export class SessionDataMediatorService implements ISessionDataMediatorContract {
  constructor(private readonly dataMediatorService: DataMediatorService) {}

  get account(): AccountDataMediatorService {
    return this.dataMediatorService.account;
  }
}
