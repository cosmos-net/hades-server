import { DeepPartial } from '@helpers/types/partials.helper';
import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';
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
  sessions?: ISessionSchemaPrimitives[];

  constructor(accountModel: AccountModel) {
    this.id = accountModel.id;
    this.uuid = accountModel.uuid;
    this.username = accountModel.username;
    this.email = accountModel.email;
    this.createdAt = accountModel.createdAt;
    this.updatedAt = accountModel.updatedAt;
    this.archivedAt = accountModel.archivedAt;
    this.sessions = accountModel.sessions.getItems;
  }
}
