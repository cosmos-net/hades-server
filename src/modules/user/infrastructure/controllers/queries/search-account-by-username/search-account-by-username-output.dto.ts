import { DeepPartial } from '@helpers/types/partials.helper';
import { AccountModel } from '@user/domain/models/account/account.model';
import { IAccountSchemaPrimitives } from '@user/domain/schemas/account/account.schema-primitive';

export class SearchAccountByUsernameOutputDto implements DeepPartial<IAccountSchemaPrimitives> {
  id?: number;
  uuid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;

  constructor(accountModel: AccountModel) {
    this.id = accountModel.id;
    this.uuid = accountModel.uuid;
    this.username = accountModel.username;
    this.email = accountModel.email;
    this.createdAt = accountModel.createdAt;
    this.updatedAt = accountModel.updatedAt;
    this.archivedAt = accountModel.archivedAt;
  }
}
