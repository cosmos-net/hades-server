import { AggregateRoot } from '@nestjs/cqrs';

import { UserCreatedEvent } from '@user/domain/events/events-success-domain/user-created.event';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { UserModel } from '@user/domain/models/user/user.model';
import { IAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { IProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export interface IUserSchemaAggregate {
  userModel?: UserModel;
  accountModel: AccountModel;
  profileModel: ProfileModel;
}

export class UserAggregate extends AggregateRoot {
  private readonly entities: IUserSchemaAggregate;

  constructor(entities: IUserSchemaAggregate) {
    super();
    this.hydrate(entities);
  }

  get userModel(): UserModel {
    return this.entities.userModel;
  }

  get accountModel(): AccountModel {
    return this.entities.accountModel;
  }

  get profileModel(): ProfileModel {
    return this.entities.profileModel;
  }

  public hydrate(entities: IUserSchemaAggregate) {
    const { userModel, accountModel, profileModel } = entities;

    if (userModel) {
      this.entities.userModel = userModel;
    }

    this.entities.accountModel = accountModel;
    this.entities.profileModel = profileModel;
  }

  public toPrimitives() {
    return {
      user: this.entities.userModel?.toPrimitives(),
      account: this.entities.accountModel.toPrimitives(),
      profile: this.entities.profileModel.toPrimitives(),
    };
  }

  // TODO: map more fields to emit the event
  public create() {
    this.apply(new UserCreatedEvent(this.userModel.uuid, this.userModel.status));
  }

  public update(account?: Partial<IAccountBaseSchema>, profile?: Partial<IProfileBaseSchema>) {
    if (account) {
      this.entities.accountModel.update(account);
    }

    if (profile) {
      this.entities.profileModel.update(profile);
    }
  }

  public archive() {
    this.entities.userModel.archive();
    this.entities.profileModel.archive();
    this.entities.accountModel.archive();
  }
}
