import { AccountModel } from '@user/domain/models/account/account.model';

export abstract class IAccountRepositoryContract {
  abstract getOneBy(UsernameOrEmailOrUUID: string): Promise<AccountModel>;
}
