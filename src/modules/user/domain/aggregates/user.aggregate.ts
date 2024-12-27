import { AggregateRoot } from '@nestjs/cqrs';

import { UserCreatedEvent } from '@user/domain/events/events-success-domain/user-created.event';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { UserModel } from '@user/domain/models/user/user.model';
import {
  DeepPartialExceptAccountBaseSchema,
  IAccountSchemaPrimitives,
} from '@user/domain/schemas/account/account.schema-primitive';
import {
  DeepPartialProfileBaseSchema,
  IProfileSchemaPrimitives,
} from '@user/domain/schemas/profile/profile.schema-primitive';
import { IUserSchemaPrimitives } from '@user/domain/schemas/user/user.schema-primitive';

export interface IUserSchemaAggregate {
  userModel?: UserModel;
  accountsModel: AccountModel[];
  profileModel: ProfileModel;
}

export interface IUserSchemaPrimitivesAggregate {
  user: IUserSchemaPrimitives;
  accounts: IAccountSchemaPrimitives[];
  profile: IProfileSchemaPrimitives;
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

  public hydrate(entities: IUserSchemaAggregate): void {
    const { userModel, accountsModel, profileModel } = entities;

    if (userModel) {
      this.entities.userModel = userModel;
    }

    this.entities.accountsModel = accountsModel;
    this.entities.profileModel = profileModel;
  }

  public toPrimitives(): IUserSchemaPrimitivesAggregate {
    return {
      user: this.userModel.toPrimitives(),
      profile: this.profileModel.toPrimitives(),
      accounts: this.accountsModel.map(
        (accountModel): IAccountSchemaPrimitives => accountModel.toPrimitives(),
      ),
    };
  }

  // TODO: map more fields to emit the event
  public create(): void {
    this.apply(new UserCreatedEvent(this.userModel.uuid, this.userModel.status));
  }

  public update(
    accounts?: DeepPartialExceptAccountBaseSchema,
    profile?: DeepPartialProfileBaseSchema,
  ): void {
    if (accounts) {
      this.entities.accountsModel.forEach((accountModel): void => {
        const account = accounts.find((account): boolean => account.uuid === accountModel.uuid);

        if (account) {
          accountModel.update(account);
        }
      });
    }

    if (profile) {
      this.entities.profileModel.update(profile);
    }
  }

  public archive(): void {
    this.entities.userModel.archive();
    this.entities.profileModel.archive();
    this.entities.accountsModel.forEach((accountModel): void => accountModel.archive());
  }

  public destroy(): void {
    this.entities.userModel.destroy();
    this.entities.profileModel.destroy();
    this.entities.accountsModel.forEach((accountModel): void => accountModel.destroy());
  }
}
