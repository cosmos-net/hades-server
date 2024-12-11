import { AggregateRoot } from '@nestjs/cqrs';

import { UserCreatedEvent } from '@user/domain/events/events-success-domain/user-created.event';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { UserModel } from '@user/domain/models/user/user.model';
import { DeepPartialExceptAccountBaseSchema } from '@user/domain/schemas/account/account.schema-primitive';
import { DeepPartialProfileBaseSchema } from '@user/domain/schemas/profile/profile.schema-primitive';

export interface IUserSchemaAggregate {
  userModel?: UserModel;
  accountsModel: AccountModel[];
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

  get accountsModel(): AccountModel[] {
    return this.entities.accountsModel;
  }

  get profileModel(): ProfileModel {
    return this.entities.profileModel;
  }

  public hydrate(entities: IUserSchemaAggregate) {
    const { userModel, accountsModel, profileModel } = entities;

    if (userModel) {
      this.entities.userModel = userModel;
    }

    this.entities.accountsModel = accountsModel;
    this.entities.profileModel = profileModel;
  }

  public toPrimitives() {
    return {
      user: this.entities.userModel?.toPrimitives(),
      account: this.entities.accountsModel.map((account) => account.toPrimitives()),
      profile: this.entities.profileModel.toPrimitives(),
    };
  }

  // TODO: map more fields to emit the event
  public create() {
    this.apply(new UserCreatedEvent(this.userModel.uuid, this.userModel.status));
  }

  public update(
    accounts?: DeepPartialExceptAccountBaseSchema,
    profile?: DeepPartialProfileBaseSchema,
  ) {
    if (accounts) {
      this.entities.accountsModel.forEach((accountModel) => {
        const account = accounts.find((account) => account.uuid === accountModel.uuid);

        if (account) {
          accountModel.update(account);
        }
      });
    }

    if (profile) {
      this.entities.profileModel.update(profile);
    }
  }

  public archive() {
    this.entities.userModel.archive();
    this.entities.profileModel.archive();
    this.entities.accountsModel.forEach((accountModel) => accountModel.archive());
  }
}
