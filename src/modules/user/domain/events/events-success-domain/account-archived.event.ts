import { AccountModel } from '@user/domain/models/account/account.model';

export class AccountArchivedEvent {
  constructor(public readonly accountsModel: AccountModel) {}
}
