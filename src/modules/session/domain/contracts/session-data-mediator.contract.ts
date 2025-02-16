import { AccountDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/account-data-mediator.service';

export interface ISessionDataMediatorContract {
  get account(): AccountDataMediatorService;
}
