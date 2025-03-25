import { IOptions } from '@common/domain/contracts/options.contract';
import { AccountModel } from '@user/domain/models/account/account.model';
export abstract class IAccountRepositoryContract {
  abstract getOneBy(UsernameOrEmailOrUUID: string, options?: IOptions): Promise<AccountModel>;
  abstract searchByEmail(email: string, options?: IOptions): Promise<AccountModel>;
  abstract searchByUsername(username: string, options?: IOptions): Promise<AccountModel>;
}
